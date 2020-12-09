import isElementVisible from './isElementVisible';

// ***************~~~IMPORTABLE~~~*****************
// fade in or out a passed element
// ************************************************
const toggleFade = (el, displayType = 'block') => {
  const element = el;
  const display = displayType;
  if (isElementVisible(element)) {
    const fade = () => {
      element.style.opacity -= 0.1;
      if ((element.style.opacity) < 0) {
        element.style.display = 'none';
      } else {
        requestAnimationFrame(fade);
      }
    };

    element.style.opacity = 1;
    fade();
  } else {
    const fade = () => {
      const val = parseFloat(element.style.opacity) + 0.1;

      if (!(val > 1)) {
        element.style.opacity = val;
        requestAnimationFrame(fade);
      }
    };

    element.style.opacity = 0;
    element.style.display = display;
    fade();
  }
};

export default toggleFade;
