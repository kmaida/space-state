import { Injectable } from '@angular/core';
import { INEO, INEONICKNAME } from './data.model';
import { BehaviorSubject, Subject } from 'rxjs';
import { UtilsService } from './utils.service';
import { scan, shareReplay } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  private initialState = [];
  private prevState: INEO[] = this.initialState;
  private state: INEO[] = this.initialState;
  private neoSubject = new BehaviorSubject<INEO[]>(this.initialState);
  private errorSubject = new Subject<string>();
  neo$ = this.neoSubject.asObservable().pipe(
    scan((prev: INEO[], newState: INEO[]) => {
      this.prevState = prev;
      this.state = [...newState];
      return this.state;
    })
  );
  errors$ = this.errorSubject.asObservable().pipe(shareReplay(1));

  constructor(private utils: UtilsService) { }

  updateNEOList(neoList: INEO[]) {
    this.neoSubject.next(neoList);
    this.errorSubject.next(null);
  }

  updateNickname(neobj: INEO|INEONICKNAME) {
    const currentState = this.utils.freezeArray([...this.state]);
    const index = currentState.findIndex(o => neobj.id === o.id);
    const newState = currentState.map((current, i) => {
      if (i === index) {
        return Object.assign({}, current, neobj);
      }
      return current;
    });
    this.neoSubject.next(newState);
    this.errorSubject.next(null);
  }

  stateError(errMsg: string, emitPrevState?: boolean) {
    this.errorSubject.next(errMsg);
    if (emitPrevState) {
      this.neoSubject.next(this.prevState);
    }
  }
}
