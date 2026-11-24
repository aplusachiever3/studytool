# Singapore Secondary School COP Finder

A standalone, static COP lookup page inside the existing `studytool` repository.

## Open the page

After GitHub Pages publishes the repository, open:

`https://aplusachiever3.github.io/studytool/secondary-cop/`

## Features

- Search 147 school records by school name or area.
- Filter by area, year label, and PG3 / IP pathway.
- View each school's 2022–2025 historical values.
- Optional PSLE score reference against the selected historical COP (not an admission prediction).
- Save favourite schools locally in the current browser.
- Compare up to three schools.
- Responsive layout; no API, login, build step, or paid service.

## Data provenance and limitations

The dataset is transcribed from the user-provided workbook:
`新加坡147所中学_2022-2025四年COP_补充IP.xlsx`.

The workbook attributes the main historical PG3 compilation to an Arche Academy historical table compiled from MOE SchoolFinder, and provides separate IP COP columns. The page preserves the workbook's values, D/M/P suffixes, DSA labels, em dashes, and missing values. A dagger (†) flags a cross-source difference according to the workbook.

**Important year-label note:** The workbook's heading refers to PSLE years 2022–2025, while its notes also say the 2022–2025 columns are labelled by intake year and separately describe intake-to-PSLE mappings. The page therefore displays the year labels exactly as provided in the spreadsheet and does not independently reinterpret them. Confirm the relevant cohort/year with MOE or the school before relying on a figure.

N/A / blank / em dash is not zero and does not imply that a school has no admission route. Some IP or specialised pathways are not directly comparable with standard PG3 posting data. NUS High School's DSA label is retained as supplied; it is not converted into a numeric COP.

A previous year's COP is the score of the last student admitted in that year's posting exercise. It is not a pre-set threshold and does not guarantee admission in a later year. See MOE's explanation:
- [MOE: Release of 2021 Secondary One Posting Results — FAQ](https://www.moe.gov.sg/-/media/files/news/press/2021/annex-s1-posting-outcomes-under-the-new-achievement-level-system.pdf)
- [MOE SchoolFinder](https://www.moe.gov.sg/schoolfinder)

This independent tool is not affiliated with or endorsed by MOE or SEAB. The figures have not all been independently re-verified against current official school data.
