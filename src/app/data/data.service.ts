import { Injectable } from '@angular/core';
import { INEO, INEONICKNAME } from './data.interface';
import { BehaviorSubject } from 'rxjs';
import { UtilsService } from './utils.service';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  private state: INEO[] = null;
  private stateNEO$ = new BehaviorSubject<INEO[]>(this.state);
  private errorMsg$ = new BehaviorSubject<string>(null);
  neo$ = this.stateNEO$.asObservable();
  errors$ = this.errorMsg$.asObservable();

  constructor(private utils: UtilsService) { }

  updateNEOList(neoList: INEO[]) {
    this.state = neoList;
    this.stateNEO$.next([...this.state]);
  }

  updateNEO(neobj: INEO|INEONICKNAME) {
    const currentState = this.utils.freezeArray([...this.state]);
    const index = currentState.findIndex(o => neobj.id === o.id);
    const newState = currentState.map((current, i) => {
      if (i === index) {
        return Object.assign({}, current, neobj);
      }
      return current;
    });
    this.state = newState;
    this.stateNEO$.next(this.state);
    this.errorMsg$.next(null);
  }

  private setPrevState(state: INEO[], newState: INEO[]) {
    if (!state && newState) {
      this.state = [...newState];
    }
  }

  stateError(errMsg: string, undoStateChange?: boolean) {
    this.errorMsg$.next(errMsg);
    if (undoStateChange) {
      this.stateNEO$.next(this.state);
    }
  }
}
