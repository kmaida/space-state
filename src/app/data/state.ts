import { INEO } from './data.model';
import { BehaviorSubject, Subject } from 'rxjs';
import { tap, shareReplay } from 'rxjs/operators';

export class State {
  private initialState: INEO[] = [];
  private prevState: INEO[];
  private state = this.initialState;
  private neoStoreSubject = new BehaviorSubject(this.initialState);
  private errorSubject = new Subject<string>();
  neoStore$ = this.neoStoreSubject.pipe(
    tap(state => this.state = [...state])
  );
  errors$ = this.errorSubject.pipe(
    shareReplay(1)
  );

  constructor() { }

  setNeoStore(neoList: INEO[]) {
    this.prevState = this.state;
    this.neoStoreSubject.next(neoList);
    this.dismissError();
  }

  updateNeo(neobj: INEO) {
    this.prevState = this.state;
    const newState = this.state.map((current) => {
      if (current.id === neobj.id) {
        return { ...current, ...neobj };
      }
      return current;
    });
    this.state = newState;
    this.neoStoreSubject.next(this.state);
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
