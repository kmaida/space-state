import { INEO } from './data.model';
import { Observable, BehaviorSubject, Subject } from 'rxjs';

export class State {
  private prevState: INEO[];
  private neoStoreSubject: BehaviorSubject<INEO[]>;
  private errorSubject: Subject<string>;
  neoStore$: Observable<INEO[]>;
  errors$: Observable<string>;

  protected constructor() {
    this.neoStoreSubject = new BehaviorSubject([]);
    this.errorSubject = new Subject();
    this.neoStore$ = this.neoStoreSubject.asObservable();
    this.errors$ = this.errorSubject.asObservable();
  }

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

  stateError(errMsg: string) {
    this.errorSubject.next(errMsg);
    this.neoStoreSubject.next(this.prevState);
  }

  dismissError() {
    this.errorSubject.next(null);
  }

}
