import $ from 'jquery/dist/jquery.min';
import isElementVisible from '../helpers/isElementVisible';
// import { toggleMobileNav } from './header';

const d = document;
const INDICATIONS_OPTIONS = {
  classes: {
    js: 'js-indication',
    hidden: 'indication--hidden',
    visible: 'indication--visible',
    focus: 'indication--focus',
  },
  session: {
    key: 'indication_dismissed',
    value: true,
  },
  transitionSpeed: 'fast',
};
const indicationsEl = d.querySelector(`.${INDICATIONS_OPTIONS.classes.js}`);

// ************************************************
// setting indication dismissed session
// ************************************************
const setIndicationDismissed = () => {
  sessionStorage.setItem(INDICATIONS_OPTIONS.session.key, INDICATIONS_OPTIONS.session.value);
};

// ************************************************
// unsetting indication dismissed session
// ************************************************
const unsetIndicationDismissed = () => {
  sessionStorage.removeItem(INDICATIONS_OPTIONS.session.key);
};

// ************************************************
// checking if indication has been dismissed by user
// ************************************************
const isIndicationDismissed = () => {
  let isDismissed = false;

  if (sessionStorage.getItem(INDICATIONS_OPTIONS.session.key)) {
    isDismissed = true;
  }

  return isDismissed;
};

// ************************************************
// showing indications banner
// ************************************************
const showIndications = (e) => {
  e.preventDefault();
  const wasIndicationsHidden = indicationsEl.classList.contains(INDICATIONS_OPTIONS.classes.hidden);
  const mobileMenu = d.querySelector('.js-header-mobile-menu');
  const timeout = (isElementVisible(mobileMenu) ? 350 : 0); 
  const timeoutPlusAnimDuration = timeout + 200;

  // scrolling to top where indications banner lives
  window.scrollTo(0, 0);
  if (!wasIndicationsHidden) {
    setTimeout(() => {
      indicationsEl.classList.add(INDICATIONS_OPTIONS.classes.focus);
    }, timeout);

    setTimeout(() => {
      indicationsEl.classList.remove(INDICATIONS_OPTIONS.classes.focus);
    }, timeoutPlusAnimDuration);
  }

  // if (isElementVisible(mobileMenu)) {
  //   toggleMobileNav();
  // } 

  setTimeout(() => {
    $(indicationsEl).fadeIn(INDICATIONS_OPTIONS.transitionSpeed);

    indicationsEl.classList.remove(INDICATIONS_OPTIONS.classes.hidden);
  }, 200);

  unsetIndicationDismissed();
};

// ************************************************
// hiding indications banner
// ************************************************
const hideIndications = (e) => {
  e.preventDefault();
  
  indicationsEl.classList.remove(INDICATIONS_OPTIONS.classes.visible);
  indicationsEl.classList.add(INDICATIONS_OPTIONS.classes.hidden);

  setIndicationDismissed();
};

// ************************************************
// showing indications banner click handler
// ************************************************
const showIndicationsHandler = () => {
  const expandTriggers = [...d.querySelectorAll(`.${INDICATIONS_OPTIONS.classes.js}-expand`)];

  expandTriggers.forEach((trigger) => {
    trigger.addEventListener('click', showIndications);
  });
};

// ************************************************
// hiding indications banner click handler
// ************************************************
const hideIndicationsHandler = () => {
  const collapseTriggers = [...d.querySelectorAll(`.${INDICATIONS_OPTIONS.classes.js}-close`)];

  collapseTriggers.forEach((trigger) => {
    trigger.addEventListener('click', hideIndications);
  });
};

const indicationsInit = () => {
  if (indicationsEl) {
    if (isIndicationDismissed()) {
      indicationsEl.classList.add(INDICATIONS_OPTIONS.classes.hidden);
    } else {
      indicationsEl.classList.add(INDICATIONS_OPTIONS.classes.visible);
    }

    showIndicationsHandler();
    hideIndicationsHandler();
  }
};

export default indicationsInit;
