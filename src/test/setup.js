import "@testing-library/jest-dom";

global.ResizeObserver = class ResizeObserver {
  observe() {}
  unobserve() {}
  disconnect() {}
};

global.matchMedia =
  global.matchMedia ||
  function () {
    return {
      matches: false,
      addEventListener() {},
      removeEventListener() {},
    };
  };
