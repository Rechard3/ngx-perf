import { Observable, observeOn, asyncScheduler } from 'rxjs';

/** returns a promise that's resolved on the next macro task */
export function perfNextMacroTask() {
  return new Promise((resolve) => setTimeout(resolve));
}

/** emits one signal (not value) on the next macrotask */
export const PERF_NEXT_MACRO_TASK$ = new Observable<void>((observer) => {
  observer.next();
  observer.complete();
}).pipe(observeOn(asyncScheduler));
