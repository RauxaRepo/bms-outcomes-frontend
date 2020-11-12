// ***************~~~IMPORTABLE~~~*****************
// element visible (display property) helper function
// ************************************************
const isElementVisible = (el) => {
  const style = window.getComputedStyle(el);
  return (style.display !== 'none');
};

export default isElementVisible;
