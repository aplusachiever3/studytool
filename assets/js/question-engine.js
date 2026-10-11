/* APLUS ACHIEVER English Adventure — reusable question engine.
 * Works with static JSON files on GitHub Pages; no API or build step required.
 */
(function (root) {
  "use strict";
  const VALID_GRADES = ["P1", "P2", "P3", "P4", "P5", "P6"];
  const VALID_TYPES = ["mcq", "short_answer", "cloze", "comprehension", "writing_prompt", "listening_prompt", "speaking_prompt"];

  function normaliseText(value) {
    return String(value == null ? "" : value).trim().toLowerCase().replace(/\\s+/g, " ");
  }

  function validateQuestion(q) {
    const errors = [];
    if (!q || typeof q !== "object" || Array.isArray(q)) return ["Question must be an object."];
    if (!q.id || typeof q.id !== "string") errors.push("Missing string id.");
    if (!VALID_GRADES.includes(q.grade)) errors.push("grade must be P1–P6.");
    if (!q.strand || typeof q.strand !== "string") errors.push("Missing strand.");
    if (!q.topic || typeof q.topic !== "string") errors.push("Missing topic.");
    if (!VALID_TYPES.includes(q.type)) errors.push("Unsupported question type.");
    if (!q.prompt || typeof q.prompt !== "string") errors.push("Missing prompt.");
    if (!q.difficulty || !Number.isInteger(q.difficulty) || q.difficulty < 1 || q.difficulty > 5) errors.push("difficulty must be an integer from 1 to 5.");
    if (q.type === "mcq") {
      if (!Array.isArray(q.options) || q.options.length < 2) errors.push("MCQ requires at least two options.");
      if (!Number.isInteger(q.answer_index) || q.answer_index < 0 || !Array.isArray(q.options) || q.answer_index >= q.options.length) errors.push("MCQ answer_index is invalid.");
      if (Array.isArray(q.options) && q.options.some(x => typeof x !== "string" || !x.trim())) errors.push("Each option must be a non-empty string.");
    }
    if (!q.explanation || typeof q.explanation !== "string") errors.push("Missing explanation.");
    return errors;
  }

  function validateBank(bank) {
    const errors = [];
    if (!bank || typeof bank !== "object" || !Array.isArray(bank.questions)) {
      return { valid: false, total: 0, errors: ["Bank must contain a questions array."] };
    }
    const ids = new Set();
    bank.questions.forEach((q, index) => {
      validateQuestion(q).forEach(message => errors.push({ index, id: q && q.id || null, message }));
      if (q && q.id) {
        if (ids.has(q.id)) errors.push({ index, id: q.id, message: "Duplicate question id." });
        ids.add(q.id);
      }
    });
    return { valid: errors.length === 0, total: bank.questions.length, errors };
  }

  function filterQuestions(questions, filters) {
    const f = filters || {};
    return (questions || []).filter(q =>
      (!f.grade || q.grade === f.grade) &&
      (!f.strand || normaliseText(q.strand) === normaliseText(f.strand)) &&
      (!f.topic || normaliseText(q.topic) === normaliseText(f.topic)) &&
      (!f.type || q.type === f.type) &&
      (!f.difficulty || q.difficulty === Number(f.difficulty)) &&
      (!f.tags || (Array.isArray(q.tags) && f.tags.every(tag => q.tags.includes(tag))))
    );
  }

  function shuffle(items, random) {
    const out = items.slice();
    const rng = typeof random === "function" ? random : Math.random;
    for (let i = out.length - 1; i > 0; i--) {
      const j = Math.floor(rng() * (i + 1));
      [out[i], out[j]] = [out[j], out[i]];
    }
    return out;
  }

  function buildQuiz(questions, options) {
    const opts = options || {};
    const filtered = filterQuestions(questions, opts);
    const ordered = opts.shuffle === false ? filtered : shuffle(filtered, opts.random);
    const count = Number.isInteger(opts.count) && opts.count > 0 ? opts.count : ordered.length;
    return ordered.slice(0, count);
  }

  function markMCQ(question, selectedIndex) {
    if (!question || question.type !== "mcq") throw new TypeError("markMCQ expects an MCQ question.");
    const correct = Number(selectedIndex) === question.answer_index;
    return { correct, explanation: question.explanation, correctIndex: question.answer_index };
  }

  async function loadGrade(grade, fetchImpl) {
    if (!VALID_GRADES.includes(grade)) throw new Error("Unknown grade: " + grade);
    const fetcher = fetchImpl || root.fetch;
    if (typeof fetcher !== "function") throw new Error("Fetch is unavailable in this environment.");
    const response = await fetcher("data/questions/" + grade.toLowerCase() + ".json");
    if (!response.ok) throw new Error("Could not load " + grade + " question bank (HTTP " + response.status + ").");
    const bank = await response.json();
    const report = validateBank(bank);
    if (!report.valid) throw new Error("Question bank validation failed: " + JSON.stringify(report.errors));
    return bank.questions;
  }

  const api = { VALID_GRADES, VALID_TYPES, validateQuestion, validateBank, filterQuestions, shuffle, buildQuiz, markMCQ, loadGrade };
  root.AplusQuestionEngine = api;
  if (typeof module !== "undefined" && module.exports) module.exports = api;
})(typeof globalThis !== "undefined" ? globalThis : this);
