import PDFObject from 'pdfobject/pdfobject.min';
import toggleFade from '../helpers/toggleFade';
import debounce from '../helpers/debounce';
import { enableScrollLock, disableScrollLock } from '../helpers/scrollLock';
import isElementVisible from '../helpers/isElementVisible';
import header from './header';
import { toggleTray } from './tray';

const d = document;
const w = window;
const { body } = document;

const modal = {
  CONFIG: {
    classes: {
      js: 'js-modal',
      jsExternal: 'js-external',
      jsOpen: 'js-modal-is-open',
    },
    types: {
      external: 'external',
      identify: 'identify',
      form: 'signup',
    },
    interstitialData: {},
  },
  closeOpenModal: debounce(() => {
    const openModal = d.querySelector(`.${modal.CONFIG.classes.jsOpen}`);
    const closeTriggers = [...Array.from(openModal.querySelectorAll(`.${modal.CONFIG.classes.js}-close`))];
    const modalContainer = openModal.querySelector('.modal__container');

    if (isElementVisible(openModal)) {
      openModal.classList.remove(modal.CONFIG.classes.jsOpen);
      toggleFade(openModal);
      disableScrollLock(modalContainer);
      modal.unbindCloseEventListeners(closeTriggers);
      d.removeEventListener('keydown', modal.closeOnEscKey);
      w.history.pushState(null, null, ' ');
      body.classList.remove('modal--open');
    }
  }, 150),
  unbindCloseEventListeners: (triggers) => {
    triggers.forEach((trigger) => {
      trigger.removeEventListener('click', modal.closeOpenModal);
    });
  },
  bindListenersToCloseTriggers: (triggers) => {
    triggers.forEach((trigger) => {
      trigger.addEventListener('click', (e) => {
        e.preventDefault();
        modal.closeOpenModal();
      });
    });
  },
  closeOnEscKey: debounce((e) => {
    const { key } = e;

    if (key === 'Escape') {
      modal.closeOpenModal();
    }
  }, 150),
  closeModalById: (targetModalId) => {
    const openModal = d.querySelector(`#${targetModalId}.${modal.CONFIG.classes.jsOpen}`);
    const closeTriggers = [...Array.from(openModal.querySelectorAll(`.${modal.CONFIG.classes.js}-close`))];
    const modalContainer = openModal.querySelector('.modal__container');

    if (isElementVisible(openModal)) {
      openModal.classList.remove(modal.CONFIG.classes.jsOpen);
      toggleFade(openModal);
      disableScrollLock(modalContainer);
      modal.unbindCloseEventListeners(closeTriggers);
      d.removeEventListener('keydown', modal.closeOnEscKey);
      w.history.pushState(null, null, ' ');
      body.classList.remove('modal--open');
    }
  },
  openModalById: debounce((targetModalId) => {
    const allModals = Array.from(d.getElementsByClassName(`${modal.CONFIG.classes.js}`));

    allModals.forEach((modalEl) => {
      const currModalId = modalEl.getAttribute('id');
      if (targetModalId === currModalId) {
        const currModalCloseTriggers = [...Array.from(modalEl.querySelectorAll(`.${modal.CONFIG.classes.js}-close`))];
        const modalContainer = modalEl.querySelector('.modal__container');
        const currOpenModal = document.querySelector('.js-modal-is-open');

        if (currOpenModal && currOpenModal.getAttribute('id') !== targetModalId) {
          modal.closeModalById(currOpenModal.getAttribute('id'));
        }
        
        if (!isElementVisible(modalEl)) {
          modalEl.classList.add(modal.CONFIG.classes.jsOpen);
          toggleFade(modalEl, 'flex');
          enableScrollLock(modalContainer);
          modal.bindListenersToCloseTriggers(currModalCloseTriggers);
          d.addEventListener('keydown', modal.closeOnEscKey);
          header.drawerClose();
          body.classList.add('modal--open');
          w.history.pushState(null, null, `#${currModalId}`);
          modal.renderPdf(modalEl);

          // if tray is expanded
          if (document.querySelector('.js-tray-expanded')) {
            toggleTray();
          }
        } else {
          header.drawerClose();
          toggleTray();
        }
      }
    });
  }, 150),
  openModalOnLoad: () => {
    if (w.location.hash !== '') {
      const targetId = w.location.hash.split('#')[1];
      const targetModal = d.getElementById(targetId);
  
      if (targetModal && targetModal.classList.contains(`${modal.CONFIG.classes.js}`)) {
        modal.openModalById(targetId);
      }
    }
  },
  renderPdf: (modalEl) => {
    if (modalEl.querySelector('.js-pdf-container')) {
      return;
    }

    const modalPdf = modalEl.querySelector('.js-modal-pdf');
    const pdfViewerUrl = document.querySelector('.js-pdf-viewer-url').getAttribute('value');
    const pdfUrlValue = modalPdf.getAttribute('data-pdf-url');
    const pdfContainer = document.createElement('div');
  
    const options = {
      assumptionMode: true,
      pdfOpenParams: {
        page: '1',
        view: 'fitH',
        statusbar: '0',
        scrollbar: '0',
        toolbar: '0',
        navpanes: '0',
        zoom: '65',
      },
      forcePDFJS: true,
      PDFJS_URL: pdfViewerUrl,
    };
  
    pdfContainer.classList.add('js-pdf-container');
    Object.assign(pdfContainer.style,
      {
        height: '100%',
        maxHeight: '100%',
      });
  
    modalPdf.appendChild(pdfContainer);
    PDFObject.embed(pdfUrlValue, pdfContainer, options);
    modal.minimizeTrayOnScroll();
  },
  minimizeTrayOnScroll: () => {
    const openedModal = document.querySelector(`.${modal.CONFIG.classes.jsOpen}`);
    const modalIframe = openedModal.querySelector('iframe');

    modalIframe.onload = () => {
      const iFrameHead = modalIframe.contentWindow.document.querySelector('head');
      const viewerContainer = modalIframe.contentWindow.document.getElementById('viewerContainer');
      const iFrameCss = '<style>#viewerContainer .page {background-color:transparent !important;}</style>';

      iFrameHead.insertAdjacentHTML('beforeend', iFrameCss);

      Object.assign(viewerContainer.style,
        {
          overflowX: 'hidden',
          marginBottom: '63px',
        });

      const minifyTray = () => {
        const trayEl = document.querySelector('.js-tray');
        if (trayEl.classList.contains('js-tray-minified')) {
          viewerContainer.removeEventListener('scroll', minifyTray);
          return;
        }

        if (viewerContainer.scrollTop > 75) {
          trayEl.style.height = `${63}px`;
        }
      };

      viewerContainer.addEventListener('scroll', minifyTray);
    };
  },
  init: () => {
    // modal triggers = anchors that have # on their href
    const defaultModalTriggers = [...Array.from(d.querySelectorAll('a[href*="#"]'))];
    defaultModalTriggers.forEach((trigger) => {
      trigger.addEventListener('click', (e) => {
        const targetId = trigger.getAttribute('href').split('#')[1];
        const targetModal = d.getElementById(targetId);

        if (targetModal && targetModal.classList.contains(`${modal.CONFIG.classes.js}`)) {
          e.preventDefault();
          modal.openModalById(targetId);
        }
      });
    });

    // opening modal on load
    w.addEventListener('DOMContentLoaded', () => {
      modal.openModalOnLoad();
    });
  },
};

export default modal;
