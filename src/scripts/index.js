// npm modules
import '@babel/polyfill/dist/polyfill.min';

// helpers
import domReady from './helpers/domReady';

// components
import lazyload from './components/lazyload';
import indicationsInit from './components/indications';

// on dom ready.
domReady(() => {
  lazyload();
  indicationsInit();
});
