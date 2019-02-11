import { INEO } from './data.model';
import { BehaviorSubject, Subject } from 'rxjs';
import { shareReplay } from 'rxjs/operators';

export class State {
  private initialState: INEO[] = [];
  private prevState: INEO[];
  private neoStoreSubject = new BehaviorSubject(this.initialState);
  private errorSubject = new Subject<string>();
  neoStore$ = this.neoStoreSubject.asObservable();
  errors$ = this.errorSubject.pipe(
    shareReplay(1)
  );

  constructor() { }

  private setPrevState() {
    this.prevState = this.neoStoreSubject.getValue();
  }

  setNeoStore(neoList: INEO[]) {
    this.setPrevState();
    this.neoStoreSubject.next(neoList);
    this.dismissError();
  }

  updateNeo(neobj: INEO) {
    this.setPrevState();
    const newState = this.prevState.map((current) => {
      if (current.id === neobj.id) {
        return { ...current, ...neobj };
      }
      return current;
    });
    this.neoStoreSubject.next(newState);
    this.dismissError();
  }

  stateError(errMsg: string, emitPrevState?: boolean) {
    this.errorSubject.next(errMsg);
    if (emitPrevState) {
      this.neoStoreSubject.next(this.prevState);
    }
  }

  dismissError() {
    this.errorSubject.next(null);
  }

}
