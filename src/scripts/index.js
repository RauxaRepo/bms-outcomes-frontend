// npm modules
import '@babel/polyfill/dist/polyfill.min';

// helpers
import domReady from './helpers/domReady';

// components
import lazyload from './components/lazyload';
import indicationsInit from './components/indications';
import tray from './components/tray';
import header from './components/header';
import modal from './components/modal';
import dateSelector from './components/date-selector';

// on dom ready.
domReady(() => {
  lazyload();
  indicationsInit();
  tray();
  header.init();
  modal.init();
  dateSelector.init();
});
