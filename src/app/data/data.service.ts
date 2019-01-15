import { Injectable } from '@angular/core';
import { INEO } from './data.interface';
import { BehaviorSubject } from 'rxjs';
import { UtilsService } from './utils.service';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  private lastState: INEO[] = null; // Used to undo state changes
  private stateNEO$ = new BehaviorSubject<INEO[]>(this.lastState);
  private errorMsg$ = new BehaviorSubject<string>(null);
  neo$ = this.stateNEO$.asObservable();
  errors$ = this.errorMsg$.asObservable();

  constructor(private utils: UtilsService) { }

  updateNEOList(neoList: INEO[]) {
    const newState = [...neoList];
    this.stateNEO$.next(newState);
    this.setPrevState(this.lastState, newState);
  }

  updateNEO(neobj: INEO) {
    const currentState = this.utils.freezeArray([...this.lastState]);
    const index = currentState.findIndex(o => neobj.name === o.name);
    const newState = currentState.map((current, i) => {
      if (i === index) {
        return Object.assign({}, current, neobj);
      }
      return current;
    });
    this.stateNEO$.next(newState);
    this.errorMsg$.next(null);
    this.setPrevState(this.lastState, newState);
  }

  private setPrevState(state: INEO[], newState: INEO[]) {
    if (!state && newState) {
      this.lastState = [...newState];
    }
  }

  stateError(errMsg: string, undoStateChange?: boolean) {
    this.errorMsg$.next(errMsg);
    if (undoStateChange) {
      this.stateNEO$.next(this.lastState);
    }
  }
}
