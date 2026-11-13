(() => {
  const menuButton = document.querySelector('.menu-toggle');
  const nav = document.querySelector('.main-nav');
  if (menuButton && nav) {
    menuButton.addEventListener('click', () => {
      const isOpen = nav.classList.toggle('open');
      menuButton.setAttribute('aria-expanded', String(isOpen));
    });
    nav.querySelectorAll('a').forEach(link => link.addEventListener('click', () => {
      nav.classList.remove('open');
      menuButton.setAttribute('aria-expanded', 'false');
    }));
  }
  const year = document.getElementById('year');
  if (year) year.textContent = new Date().getFullYear();
  const form = document.getElementById('consultation-form');
  if (form) form.addEventListener('submit', event => {
    event.preventDefault();
    const data = new FormData(form);
    const subject = encodeURIComponent('INQ EDU Consultation Enquiry');
    const body = encodeURIComponent(
      'Name: ' + data.get('name') + '\n' +
      'Email: ' + data.get('email') + '\n' +
      'Programme: ' + data.get('programme') + '\n\n' +
      'Message:\n' + (data.get('message') || 'No additional message')
    );
    const status = form.querySelector('.form-status');
    if (status) status.textContent = 'Your email app should open with the enquiry details. Please add the INQ EDU contact email before sending.';
    window.location.href = 'mailto:?subject=' + subject + '&body=' + body;
  });
})();