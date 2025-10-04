// debounce function to limit the rate at which a function can fire.

export function debounce<F extends (...args: any[]) => void>(func: F, waitFor: number) {
  let timeout: ReturnType<typeof setTimeout>;

  return (...args: Parameters<F>): void => {
    if (timeout) {
      clearTimeout(timeout);
    }
    timeout = setTimeout(() => func(...args), waitFor);
  };
}