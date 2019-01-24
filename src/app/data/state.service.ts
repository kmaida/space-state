import { Injectable } from '@angular/core';
import { INEO } from 'src/app/data/data.model';
import { BehaviorSubject, Subject } from 'rxjs';
import { tap, shareReplay } from 'rxjs/operators';
import { Router, NavigationEnd } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class StateService {
  private initialState: INEO[] = [];
  private prevState;
  // TODO: explore removing this.
  private state = this.initialState;
  private neoSubject = new BehaviorSubject(this.initialState);
  private errorSubject = new Subject<string>();
  store$ = this.neoSubject.pipe(
    tap(state => this.state = [...state])
  );
  errors$ = this.errorSubject.pipe(
    shareReplay(1)
  );

  constructor(private router: Router) {
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
    this.prevState = this.state;
    const newState = this.state.map((current) => {
      if (current.id === neobj.id) {
        return { ...current, ...neobj };
      }
      return current;
    });
    this.state = newState;
    this.neoSubject.next(this.state);
    this.errorSubject.next(null);
  }

  stateError(errMsg: string, emitPrevState?: boolean) {
    // @TODO: replace unsaved state in nickname field
    this.errorSubject.next(errMsg);
    if (emitPrevState) {
      this.neoSubject.next(this.prevState);
    }
  }

  dismissError() {
    this.errorSubject.next(null);
  }
}

