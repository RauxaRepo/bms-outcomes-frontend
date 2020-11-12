// ***************~~~IMPORTABLE~~~*****************
// Waits until DOM is completely loaded to execute
// passed functions
// ************************************************
const domReady = (fn) => {
  if (document.readyState !== 'loading') {
    fn();
  } else if (document.addEventListener) {
    document.addEventListener('DOMContentLoaded', fn);
  } else {
    document.attachEvent('onreadystatechange', () => {
      if (document.readyState !== 'loading') {
        fn();
      }
    });
  }
};

export default domReady;
