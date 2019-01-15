import { Injectable } from '@angular/core';
import { INEO } from './data.interface';
import { BehaviorSubject } from 'rxjs';
import { UtilsService } from './utils.service';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  private lastState: INEO[] = null; // TODO: this should be used to replay previous state
  private stateNEO$ = new BehaviorSubject<INEO[]>(null);
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

  stateError(errMsg: string) {
    this.errorMsg$.next(errMsg);
    this.stateNEO$.next(this.lastState);
  }
}
