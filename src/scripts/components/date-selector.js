global.jQuery = require('jquery');
global.IScroll = require('iscroll');
require('jquery-drawer');

window.$ = window.jQuery;

const dataSelectEl = document.querySelector('.js-date-selector');

const dateSelector = {
  CONFIG: {
    classes: {
      js: 'js-date-selector',
      css: 'date-selector',
      drawer: 'js-drawer',
    },
  },
  init: () => {
    sessionStorage.setItem('therapyStartDate', Date.now());
    const defaultButton = dataSelectEl.querySelector('.js-next');
    defaultButton.addEventListener('click', (e) => {
      e.preventDefault();
      e.stopPropagation();
      const month = dataSelectEl.querySelector('.js-select-month') || new Date().getMonth();
      const year = dataSelectEl.querySelector('.js-select-year') || new Date().getFullYear();

      const date = new Date(year, month, 1);
      sessionStorage.setItem('therapyStartDate', date);
    });
  },
};

export default dateSelector;
