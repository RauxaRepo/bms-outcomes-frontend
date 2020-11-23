import { disableBodyScroll, enableBodyScroll } from 'body-scroll-lock/lib/bodyScrollLock.min';

// ***************~~~IMPORTABLE~~~*****************
// enable scroll lock allowing target element
//  to scroll
// ************************************************
export const enableScrollLock = (scrollableTarget) => {
  const body = document.querySelector('.js-body');

  body.classList.add('js-scroll-lock');
  disableBodyScroll(scrollableTarget);
};

// ***************~~~IMPORTABLE~~~*****************
// disable scroll lock allowing target element
//  to scroll
// ************************************************
export const disableScrollLock = (scrollableTarget) => {
  const body = document.querySelector('.js-body');

  body.classList.remove('js-scroll-lock');
  enableBodyScroll(scrollableTarget);
};