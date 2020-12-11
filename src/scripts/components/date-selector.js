global.jQuery = require('jquery');
global.IScroll = require('iscroll');
require('jquery-drawer');

window.$ = window.jQuery;

const dataSelectEl = document.querySelector('.js-date-selector');
const sessionKey = 'therapyStartDate';

const dateSelector = {
  CONFIG: {
    classes: {
      js: 'js-date-selector',
      css: 'date-selector',
      drawer: 'js-drawer',
    },
  },
  init: () => {
    const selectedDate = sessionStorage.getItem(sessionKey);
    if (!selectedDate) {
      sessionStorage.setItem(sessionKey, Date.now());
    } else {
      // eslint-disable-next-line no-restricted-globals
      const selectedValue = isNaN(selectedDate) ? new Date(selectedDate)
        : new Date(parseInt(selectedDate, 10));
      for (const option of document.querySelectorAll('.custom-options-month > .custom-option')) {
        if (option.dataset.value === (selectedValue.getMonth() + 1).toString()) {
          option.parentNode.querySelector('.custom-option.selected').classList.remove('selected');
          option.classList.add('selected');
          option.closest('.custom-select-month').querySelector('.custom-select-month__trigger span').textContent = option.textContent;
        }
      }
      for (const option of document.querySelectorAll('.custom-options-year > .custom-option')) {
        if (option.dataset.value === selectedValue.getUTCFullYear().toString()) {
          option.parentNode.querySelector('.custom-option.selected').classList.remove('selected');
          option.classList.add('selected');
          option.closest('.custom-select-year').querySelector('.custom-select-year__trigger span').textContent = option.textContent;
        }
      }
    }

    const defaultButton = dataSelectEl.querySelector('.js-next');
    defaultButton.addEventListener('click', (e) => {
      e.preventDefault();
      e.stopPropagation();
      const elemMonth = document.querySelector('.custom-options-month > .custom-option.selected');
      const elemYear = document.querySelector('.custom-options-year > .custom-option.selected');
      const month = elemMonth.dataset.value - 1 || new Date().getMonth();
      const year = elemYear.dataset.value || new Date().getFullYear();

      const date = new Date(year, month, 1);
      sessionStorage.setItem('therapyStartDate', date);
    });
    
    document.querySelector('.custom-select-month').addEventListener('click', function () {
      this.querySelector('.custom-select-month').classList.toggle('open');
    });

    for (const option of document.querySelectorAll('.custom-options-month > .custom-option')) {
      option.addEventListener('click', function () {
        if (!this.classList.contains('selected')) {
          this.parentNode.querySelector('.custom-option.selected').classList.remove('selected');
          this.classList.add('selected');
          this.closest('.custom-select-month').querySelector('.custom-select-month__trigger span').textContent = this.textContent;
        }
      });
    }
    window.addEventListener('click', (e) => {
      const selectMonth = document.querySelector('.custom-select-month');
      if (!selectMonth.contains(e.target)) {
        selectMonth.classList.remove('open');
      }
      const selectYear = document.querySelector('.custom-select-year');
      if (!selectYear.contains(e.target)) {
        selectYear.classList.remove('open');
      }
    });

    document.querySelector('.custom-select-year').addEventListener('click', function () {
      this.querySelector('.custom-select-year').classList.toggle('open');
    });
    for (const option of document.querySelectorAll('.custom-options-year > .custom-option')) {
      option.addEventListener('click', function () {
        if (!this.classList.contains('selected')) {
          this.parentNode.querySelector('.custom-option.selected').classList.remove('selected');
          this.classList.add('selected');
          this.closest('.custom-select-year').querySelector('.custom-select-year__trigger span').textContent = this.textContent;
        }
      });
    }
  },
};

export default dateSelector;
