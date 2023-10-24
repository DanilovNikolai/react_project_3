// debounce.ts

const debounce = (func: Function, delay: number) => {
  let timeout: NodeJS.Timeout;

  return function (event: Event) {
    if (timeout) {
      clearTimeout(timeout);
    }
    timeout = setTimeout(() => {
      func(event);
    }, delay);
  };
};

export default debounce;
