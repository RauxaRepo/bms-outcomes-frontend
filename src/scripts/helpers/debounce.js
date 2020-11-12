// ***************~~~IMPORTABLE~~~*****************
// Debounces events and executes handler on last
// event in time interval
// ************************************************
const debounce = (cb, wait) => {
  let timeout = null;
  return (...args) => {
    const next = () => cb(...args);
    clearTimeout(timeout);
    timeout = setTimeout(next, wait);
  };
};

export default debounce;
