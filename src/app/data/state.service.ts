import { Injectable } from '@angular/core';
import { INEO } from './data.model';
import { BehaviorSubject, Subject } from 'rxjs';
import { UtilsService } from './utils.service';
import { scan, shareReplay } from 'rxjs/operators';
import { Router, NavigationEnd } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class StateService {
  private initialState = [];
  prevState: INEO[] = this.initialState;
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
  errors$ = this.errorSubject.asObservable().pipe(
    shareReplay(1)
  );

  constructor(
    private utils: UtilsService,
    private router: Router
  ) {
    this.router.events.subscribe(
      event => {
        if (event instanceof NavigationEnd) {
          this.errorSubject.next(null);
        }
      }
    );
  }

  updateNEOList(neoList: INEO[]) {
    this.neoSubject.next(neoList);
    this.errorSubject.next(null);
  }

  updateNeo(neobj: INEO) {
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

  dismissError() {
    this.errorSubject.next(null);
  }
}
