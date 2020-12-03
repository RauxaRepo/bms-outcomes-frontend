import PDFObject from 'pdfobject/pdfobject.min';
import debounce from '../helpers/debounce';
import { enableScrollLock, disableScrollLock } from '../helpers/scrollLock';

const trayEl = document.querySelector('.js-tray');
const trayContent = trayEl.querySelector('.js-tray-content');
const trayDefaultTab = trayEl.querySelector('.js-tab-default');
const tabs = [...trayEl.getElementsByClassName('js-tray-tab')];
const tabButtons = [...trayEl.getElementsByClassName('js-tab-select')];
const scrollBuffer = 15;
const initialScrollPos = window.pageYOffset;
let trayHeight = 63;
const body = document.querySelector('.js-body');

// ************************************************
// set bottom of document buffer dead space
// to account for tray's fixed posiition
// ************************************************
const bottomOffset = () => {
  body.style.paddingBottom = `${trayHeight}px`;
};

// ************************************************
// set the height of the tray and inner container
// of available vertical space on viewport
// ************************************************
export const setExpandedTrayHeight = () => {
  const trayHeader = trayEl.querySelector('.js-tray-header');
  const w = window;
  const windowHeight = w.innerHeight;

  trayEl.style.height = `${windowHeight - 78}px`;

  trayContent.style.height = `calc(100% - ${trayHeader.offsetHeight }px)`;
};

// ************************************************
// collapse the tray to docked size.
// ************************************************
const minimizeTray = () => {
  if (window.pageYOffset > (initialScrollPos + scrollBuffer)
    || window.pageYOffset < (initialScrollPos - scrollBuffer)) {
    // dock tray, refresh offset
    trayEl.style.height = `${trayHeight}px`;
    document.removeEventListener('scroll', minimizeTray);
  }
};

// ***************~~~IMPORTABLE~~~*****************
// show or hide tray and reset to default ISI tab.
// ************************************************
export const toggleTray = () => {
  const defaultButton = trayEl.querySelector('.js-button-default');
  const icon = trayEl.querySelector('.js-expand-icon');
  const helperOpen = trayEl.querySelector('.js-tray-helper-open');
  const helperClose = trayEl.querySelector('.js-tray-helper-close');
  const hiddenContent = trayEl.querySelector('.js-isi-hidden-block');
  const isTrayExpanded = trayEl.classList.contains('js-tray-expanded');

  if (isTrayExpanded) {
    trayEl.style.height = `${trayHeight}px`;

    // active tab cleanup, and resetting ISI tab as active, scrolling to top of inner container
    tabButtons.forEach((button) => {
      button.classList.remove('tray__button--active');
    });

    tabs.forEach((tab) => {
      const currTab = tab;
      currTab.style.display = 'none';
    });

    trayDefaultTab.style.display = 'block';
    disableScrollLock(trayContent);
    defaultButton.classList.add('tray__button--active');
    icon.classList.remove('tray__span--icon-expanded');

    trayContent.scrollTop = 0;

    if (hiddenContent) {
      hiddenContent.style.display = 'none';
    }

    window.removeEventListener('resize', setExpandedTrayHeight);

    trayEl.classList.remove('js-tray-expanded');
    body.classList.remove('tray--expanded');
  } else {
    document.removeEventListener('scroll', minimizeTray);

    setExpandedTrayHeight();
    enableScrollLock(trayContent);
    icon.classList.add('tray__span--icon-expanded');
    trayEl.classList.add('js-tray-expanded');
    body.classList.add('tray--expanded');
    trayContent.scrollTop = 0;

    if (hiddenContent) {
      hiddenContent.style.display = 'block';
    }

    window.addEventListener('resize', setExpandedTrayHeight);
  }

  if (window.matchMedia('(min-width: 768px)').matches) {
    if (trayEl.classList.contains('js-tray-expanded')) {
      helperOpen.style.display = 'none';
      helperClose.style.display = 'block';
    } else {
      helperOpen.style.display = 'block';
      helperClose.style.display = 'none';
    }
  }
};

// ************************************************
// expand/collapse tray on element click
// ************************************************
const expandButtonClick = debounce(() => {
  const expandTriggers = [...document.getElementsByClassName('js-expand-tray')];

  expandTriggers.forEach((trigger) => {
    trigger.addEventListener('click', (e) => {
      e.preventDefault();
      e.stopPropagation();
      if (!trayEl.classList.contains('js-tray-expanded') && trigger.classList.contains('js-tab-select')) {
        toggleTray();
      } else if (!trigger.classList.contains('js-tab-select')) {
        toggleTray();
      }
      // trayContent.removeEventListener('scroll', toggleOnScrollTop, false);
    });
  });
}, 200);

// ************************************************
// expanding tray on scrollable element focus
// ************************************************
const expandOnFocus = () => {
  const isTrayExpanded = trayEl.classList.contains('js-tray-expanded');
  if (isTrayExpanded) {
    return;
  }

  toggleTray();
};

// ************************************************
// scrolling events for tray, expand on bottom of
// page and minimize on initial scrolling
// ************************************************
const trayScrollEvents = () => {
  document.addEventListener('DOMContentLoaded', () => {
    // waiting after load to attach listeners
    setTimeout(() => {
      document.addEventListener('scroll', minimizeTray);
      trayDefaultTab.addEventListener('click', expandOnFocus);
    }, 200);
  });
};

// ************************************************
// render pdf document and init the plugin
// ************************************************
const pdfRender = (page = 1, pdfUrl) => {
  const container = trayEl.querySelector('.js-pdf-container');
  let pdfViewerUrl = pdfUrl.getAttribute('data-pdf-viewer');
  let pdfUrlValue = pdfUrl.getAttribute('data-pdf-url');

  const options = {
    assumptionMode: true,
    pdfOpenParams: {
      page,
      view: 'fitH',
      statusbar: '0',
      scrollbar: '0',
      toolbar: '0',
      navpanes: '0',
    },
    forcePDFJS: true,
    PDFJS_URL: pdfViewerUrl,
  };

  if (container) {
    container.remove();
  }

  const pdfContainer = document.createElement('div');
  pdfContainer.classList.add('tray__block', 'tray__block--pdf-inner', 'js-pdf-container');

  pdfUrl.appendChild(pdfContainer);

  PDFObject.embed(pdfUrlValue, pdfContainer, options);
};

// ************************************************
// tab selection events for the inner tray layout
// ************************************************
const tabEvents = () => {
  tabButtons.forEach((button) => {
    button.addEventListener('click', (e) => {
      e.preventDefault();
      const targetTab = button.getAttribute('data-tab');
      const currActive = trayEl.querySelector('.tray__button.js-tab-select.tray__button--active');

      // if target tab is different than active tab
      if (currActive.getAttribute('data-tab') !== targetTab) {
        currActive.classList.remove('tray__button--active');
        button.classList.add('tray__button--active');

        tabs.forEach((tab) => {
          const tabNum = tab.getAttribute('data-tab');
          const currTab = tab;

          if (targetTab === tabNum) {
            currTab.style.display = 'block';

            // todo if tab contains pdf url  == render pdf
            if (currTab.querySelector('.js-pdf-tab')) {
              pdfRender(1, currTab.querySelector('.js-pdf-tab'));
            }
          } else {
            currTab.style.display = 'none';
          }
        });
      }
    });
  });
};

// ************************************************
// tray initializer
// ************************************************
const tray = () => {
  if (trayEl) {
    bottomOffset();
    trayScrollEvents();
    expandButtonClick();
    tabEvents();
  }
};

export default tray;
tray();
