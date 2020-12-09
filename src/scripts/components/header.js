global.jQuery = require('jquery');
global.IScroll = require('iscroll');
require('jquery-drawer');

window.$ = window.jQuery;

const header = {
  CONFIG: {
    classes: {
      js: 'js-header',
      css: 'header',
      drawer: 'js-drawer',
    },
  },
  drawerInit: () => {
    jQuery(() => {
      jQuery('.js-body').drawer({
        class: {
          nav: `${header.CONFIG.classes.drawer}-nav`,
          toggle: `${header.CONFIG.classes.drawer}-toggle`,
          open: 'drawer--open',
          close: 'drawer--closed',
        },
        iscroll: {
          mouseWheel: true,
          preventDefault: false,
        },
        showOverlay: false,
      });
    });
  },
  drawerClose: () => {
    jQuery(() => {
      jQuery('.js-body').drawer('close');
    });
  },
  init: () => {
    const headerEl = document.querySelector(`.${header.CONFIG.classes.js}`);

    if (headerEl) {
      header.drawerInit();
    }
  },
};

export default header;
