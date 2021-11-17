const dateSelectorEl = document.querySelector('.js-date-selector');
const presentDate = new Date();

const dateSelector = {
  CONFIG: {
    classes: {
      js: 'js-date-selector',
      jsMonthSelect: 'js-month-select',
      jsYearSelect: 'js-year-select',
      jsCustomSelect: 'js-custom-select',
    },
  },
  populateMonthField: () => {
    const monthOptionsContainer = dateSelectorEl.querySelector(`.${dateSelector.CONFIG.classes.jsMonthSelect}-options`);
    const months = 11;
    let monthIndex = 0;

    for (monthIndex; monthIndex <= months; monthIndex += 1) {
      const date = new Date(2020, monthIndex, 1);
      const optionContainer = document.createElement('span');
      const dataVal = monthIndex + 1;
      optionContainer.dataset.month = dataVal.toString().padStart(2, '0');
      optionContainer.innerHTML = date.toLocaleString('default', { month: 'long' });
      optionContainer.classList.add('custom-select__option', `${dateSelector.CONFIG.classes.jsMonthSelect}-option`);
      monthOptionsContainer.appendChild(optionContainer);
    }
  },
  populateYearField: () => {
    const yearOptionsContainer = dateSelectorEl.querySelector(`.${dateSelector.CONFIG.classes.jsYearSelect}-options`);
    const currYear = presentDate.getFullYear();
    // const startYear = currYear - 6;
    // const endYear = currYear + 7;
    const startYear = 2015;
    const endYear = 2028;

    let yearIndex;

    for (yearIndex = startYear; yearIndex <= endYear; yearIndex += 1) {
      const optionContainer = document.createElement('span');
      optionContainer.dataset.year = yearIndex;
      optionContainer.innerHTML = yearIndex;
      optionContainer.classList.add('custom-select__option', `${dateSelector.CONFIG.classes.jsYearSelect}-option`);
      yearOptionsContainer.appendChild(optionContainer);
    }
  },
  yearSelectEvents: () => {
    const yearOptions = [...dateSelectorEl.querySelectorAll(`.${dateSelector.CONFIG.classes.jsYearSelect}-option`)];
    const yearSelectLabel = dateSelectorEl.querySelector(`.${dateSelector.CONFIG.classes.jsYearSelect}-label`);

    const saveYearSelect = (e) => {
      e.preventDefault();
      const { target } = e;
      const currYearSelected = dateSelectorEl.querySelector(`.${dateSelector.CONFIG.classes.jsYearSelect}-option.custom-select__option--selected`);
      const selectedValue = target.dataset.year;
      const yearSelectTrigger = dateSelectorEl.querySelector(`.${dateSelector.CONFIG.classes.jsYearSelect}-trigger`);
      const yearErrorlbl = document.querySelector('.js-year-select .custom-select__error');

      if (currYearSelected && currYearSelected.dataset.year !== selectedValue) currYearSelected.classList.remove('custom-select__option--selected');
      target.classList.add('custom-select__option--selected');
      yearSelectTrigger.classList.add('custom-select__trigger--dirty');
      yearSelectLabel.innerHTML = selectedValue;
      yearErrorlbl.classList.remove('custom-select__error--visible');
    };

    yearOptions.forEach((yearOption) => {
      yearOption.addEventListener('click', saveYearSelect);
    });
  },
  monthSelectEvents: () => {
    const monthOptions = [...dateSelectorEl.querySelectorAll(`.${dateSelector.CONFIG.classes.jsMonthSelect}-option`)];
    const monthSelectLabel = dateSelectorEl.querySelector(`.${dateSelector.CONFIG.classes.jsMonthSelect}-label`);

    const saveMonthSelect = (e) => {
      e.preventDefault();
      // e.stopPropagation();
      const { target } = e;
      const currMonthSelected = dateSelectorEl.querySelector(`.${dateSelector.CONFIG.classes.jsMonthSelect}-option.custom-select__option--selected`);
      const selectedValue = target.dataset.month;
      const monthSelectTrigger = dateSelectorEl.querySelector(`.${dateSelector.CONFIG.classes.jsMonthSelect}-trigger`);
      const monthErrorLbl = document.querySelector('.js-month-select .custom-select__error');

      if (currMonthSelected && currMonthSelected.dataset.month !== selectedValue) currMonthSelected.classList.remove('custom-select__option--selected');
      target.classList.add('custom-select__option--selected');
      monthSelectTrigger.classList.add('custom-select__trigger--dirty');
      monthSelectLabel.innerHTML = target.innerHTML;
      monthErrorLbl.classList.remove('custom-select__error--visible');
    };

    monthOptions.forEach((monthOption) => {
      monthOption.addEventListener('click', saveMonthSelect);
    });
  },
  submitButtonHandler: (e) => {
    e.preventDefault();
    const targetLocation = e.target.getAttribute('href');
    const elemMonth = dateSelectorEl.querySelector(`.${dateSelector.CONFIG.classes.jsMonthSelect}-option.custom-select__option--selected`);
    const elemYear = dateSelectorEl.querySelector(`.${dateSelector.CONFIG.classes.jsYearSelect}-option.custom-select__option--selected`);
    const currTherapyStart = JSON.parse(sessionStorage.getItem('therapyStart'));
    const currTherapyStartDate = new Date(currTherapyStart.fullDate);
    const monthErrorLbl = document.querySelector('.js-month-select .custom-select__error');
    const yearErrorlbl = document.querySelector('.js-year-select .custom-select__error');

    if (elemYear) {
      const { year } = elemYear.dataset;
      currTherapyStartDate.setFullYear(year);
      const newTherapyStartFullDate = new Date(currTherapyStartDate);

      dateSelector.setStartAndProgDate(newTherapyStartFullDate);
      sessionStorage.setItem('isDefaultStartDate', 0);
      yearErrorlbl.classList.remove('custom-select__error--visible');
    } else {
      yearErrorlbl.classList.add('custom-select__error--visible');
    }

    if (elemMonth) {
      let { month } = elemMonth.dataset;
      month = parseInt(month, 0) - 1;
      month = month.toString().padStart(2, '0');

      currTherapyStartDate.setMonth(month);
      const newTherapyStartFullDate = new Date(currTherapyStartDate);

      dateSelector.setStartAndProgDate(newTherapyStartFullDate);
      sessionStorage.setItem('isDefaultStartDate', 0);
      monthErrorLbl.classList.remove('custom-select__error--visible');
    } else {
      monthErrorLbl.classList.add('custom-select__error--visible');
    }

    if (elemMonth && elemYear) {
      document.location.href = targetLocation;
    }
  },
  setStartAndProgDate: (startDate) => {
    const saveTherapyStart = () => {
      const year = startDate.getFullYear().toString();
      let month = startDate.getMonth();
      const monthYearString = `${startDate.toLocaleString('default', { month: 'long' })} ${startDate.getFullYear()}`;
      month += 1;
      month = month.toString().padStart(2, '0');

      const therapyStart = {
        year,
        month,
        fullDate: startDate,
        monthYearString,
      };

      sessionStorage.setItem('therapyStart', JSON.stringify(therapyStart));
    };

    const saveProgressionEnd = () => {
      const progEndDate = new Date(startDate);
      // 67 months = 5.7 years
      const fullDate = new Date(progEndDate.setMonth(progEndDate.getMonth() + 67));
      const year = fullDate.getFullYear().toString();
      let month = fullDate.getMonth();
      const monthYearString = `${fullDate.toLocaleString('default', { month: 'long' })} ${fullDate.getFullYear()}`;
      month += 1;
      month = month.toString().padStart(2, '0');

      const progressionEnd = {
        year,
        month,
        fullDate,
        monthYearString,
      };

      sessionStorage.setItem('progressionEnd', JSON.stringify(progressionEnd));
    };

    saveTherapyStart();
    saveProgressionEnd();
  },
  dropDownEvents: (e) => {
    e.preventDefault();
    e.stopPropagation();
    const openDropdown = dateSelectorEl.querySelector(`.${dateSelector.CONFIG.classes.jsCustomSelect}.custom-select--open`);
    const closestSelect = e.target.closest(`.${dateSelector.CONFIG.classes.jsCustomSelect}`);

    const openDropdownClose = (event) => {
      const customSelect = dateSelectorEl.querySelector(`.${dateSelector.CONFIG.classes.jsCustomSelect}`);

      if (!customSelect.contains(event.target)) {
        if (!dateSelectorEl.querySelector(`.${dateSelector.CONFIG.classes.jsCustomSelect}.custom-select--open`)) {
          window.removeEventListener('click', openDropdownClose);
        } else {
          dateSelectorEl.querySelector(`.${dateSelector.CONFIG.classes.jsCustomSelect}.custom-select--open`).classList.remove('custom-select--open');
          window.removeEventListener('click', openDropdownClose);
        }
      }
    };

    if (openDropdown && openDropdown !== closestSelect) openDropdown.classList.remove('custom-select--open');

    if (closestSelect.classList.contains('custom-select--open')) {
      closestSelect.classList.remove('custom-select--open');
      window.removeEventListener('click', openDropdownClose);
    } else {
      closestSelect.classList.add('custom-select--open');
      window.addEventListener('click', openDropdownClose);
    }
  },
  setDropdownValuesOnLoad: () => {
    const isDefaultStartDate = parseInt(sessionStorage.getItem('isDefaultStartDate'), 0);
    const yearSelectLabel = dateSelectorEl.querySelector(`.${dateSelector.CONFIG.classes.jsYearSelect}-label`);
    const monthSelectLabel = dateSelectorEl.querySelector(`.${dateSelector.CONFIG.classes.jsMonthSelect}-label`);

    if (isDefaultStartDate === 1) {
      monthSelectLabel.innerHTML = 'month';
      yearSelectLabel.innerHTML = 'year';

      document.querySelector('.js-month-select').classList.add('custom-select--default');
      document.querySelector('.js-year-select').classList.add('custom-select--default');

      return;
    }

    const therapyStart = JSON.parse(sessionStorage.getItem('therapyStart'));
    let { month } = therapyStart;
    const { year } = therapyStart;
    const monthOptionThatMatchesDate = dateSelectorEl.querySelector(`.${dateSelector.CONFIG.classes.jsMonthSelect}-option[data-month="${month}"]`);
    const yearOptionThatMatchesDate = dateSelectorEl.querySelector(`.${dateSelector.CONFIG.classes.jsYearSelect}-option[data-year="${year}"]`);

    monthOptionThatMatchesDate.classList.add('custom-select__option--selected');
    yearOptionThatMatchesDate.classList.add('custom-select__option--selected');
    monthSelectLabel.innerHTML = monthOptionThatMatchesDate.innerHTML;
    yearSelectLabel.innerHTML = yearOptionThatMatchesDate.innerHTML;
  },
  outputValues: () => {
    const printTherapyEls = [...document.querySelectorAll('.js-print-therapy-start')];
    const printTherapyAltEls = [...document.querySelectorAll('.js-print-therapy-start-alt')];
    const printProgressionEls = [...document.querySelectorAll('.js-print-prog-end')];
    const printProgressionAltEls = [...document.querySelectorAll('.js-print-prog-end-alt')];

    if (printTherapyEls.length) {
      printTherapyEls.forEach((el) => {
        const data = JSON.parse(sessionStorage.getItem('therapyStart'));

        el.innerHTML = `${data.month}/${data.year}`;
      });
    }

    if (printTherapyAltEls.length) {
      printTherapyAltEls.forEach((el) => {
        const data = JSON.parse(sessionStorage.getItem('therapyStart'));

        el.innerHTML = `${data.monthYearString}`;
      });
    }

    if (printProgressionEls.length) {
      printProgressionEls.forEach((el) => {
        const data = JSON.parse(sessionStorage.getItem('progressionEnd'));

        el.innerHTML = `${data.month}/${data.year}`;
      });
    }

    if (printProgressionAltEls.length) {
      printProgressionAltEls.forEach((el) => {
        const data = JSON.parse(sessionStorage.getItem('progressionEnd'));

        el.innerHTML = `${data.monthYearString}`;
      });
    }
  },
  init: () => {
    const therapyStart = sessionStorage.getItem('therapyStart');
    const progressionEnd = sessionStorage.getItem('progressionEnd');
    // if the user has not set start date on the session, we set it to present time
    if (!therapyStart && !progressionEnd) {
      dateSelector.setStartAndProgDate(presentDate);
      sessionStorage.setItem('isDefaultStartDate', 1);
    }

    dateSelector.outputValues();

    if (!dateSelectorEl) return;

    const submitButton = dateSelectorEl.querySelector(`.${dateSelector.CONFIG.classes.js}-submit`);
    const monthDropdown = dateSelectorEl.querySelector(`.${dateSelector.CONFIG.classes.jsMonthSelect}`);
    const yearDropdown = dateSelectorEl.querySelector(`.${dateSelector.CONFIG.classes.jsYearSelect}`);

    dateSelector.populateMonthField();
    dateSelector.populateYearField();
    dateSelector.yearSelectEvents();
    dateSelector.monthSelectEvents();
    dateSelector.setDropdownValuesOnLoad();

    monthDropdown.addEventListener('click', dateSelector.dropDownEvents);
    yearDropdown.addEventListener('click', dateSelector.dropDownEvents);
    submitButton.addEventListener('click', dateSelector.submitButtonHandler);
  },
};

export default dateSelector;
