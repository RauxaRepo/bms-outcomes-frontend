// npm modules
import '@babel/polyfill/dist/polyfill.min';

// helpers
import domReady from './helpers/domReady';

// components
import lazyload from './components/lazyload';
import indicationsInit from './components/indications';
import tray from './components/tray';
import header from './components/header';

// on dom ready.
domReady(() => {
  lazyload();
  indicationsInit();
  tray();
  header.init();
});
