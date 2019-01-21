import { Injectable } from '@angular/core';
import { INEO, INEONICKNAME } from './data.interface';
import { BehaviorSubject } from 'rxjs';
import { UtilsService } from './utils.service';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  private state: INEO[] = null;
  private prevState: INEO[] = this.state;
  private stateNEO$ = new BehaviorSubject<INEO[]>(this.state);
  private errorMsg$ = new BehaviorSubject<string>(null);
  neo$ = this.stateNEO$.asObservable();
  errors$ = this.errorMsg$.asObservable();

  constructor(private utils: UtilsService) { }

  updateNEOList(neoList: INEO[]) {
    this.prevState = this.state;
    this.state = [...neoList];
    this.stateNEO$.next(this.state);
  }

  updateNEO(neobj: INEO|INEONICKNAME) {
    this.prevState = this.state;
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

  private undoLastState() {
    this.state = [...this.prevState];
    this.stateNEO$.next(this.state);
  }

  stateError(errMsg: string, undoStateChange?: boolean) {
    this.errorMsg$.next(errMsg);
    if (undoStateChange) {
      this.stateNEO$.next(this.state);
    }
  }
}
