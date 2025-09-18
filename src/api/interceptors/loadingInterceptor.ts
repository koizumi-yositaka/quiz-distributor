type Listener = (count: number) => void;

let pendingCount = 0;
let listener: Listener | null = null;

export const loadingInterceptor = {
  setListener(fn: Listener | null) {
    listener = fn;
  },
  increment() {
    pendingCount += 1;
    if (listener) listener(pendingCount);
  },
  decrement() {
    pendingCount = Math.max(0, pendingCount - 1);
    if (listener) listener(pendingCount);
  },
  reset() {
    pendingCount = 0;
    if (listener) listener(pendingCount);
  },
  getCount() {
    return pendingCount;
  }
};


