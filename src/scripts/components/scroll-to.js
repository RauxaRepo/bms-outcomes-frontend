const scrollTo = {
  init: () => {
    const scrollEls = [...document.querySelectorAll('.js-scroll')];

    if (scrollEls.length) {
      scrollEls.forEach((el) => {
        el.addEventListener('click', () => {
          window.scrollTo({ top: window.innerHeight, behavior: 'smooth' });
        });
      });
    }
  },
};

export default scrollTo;
