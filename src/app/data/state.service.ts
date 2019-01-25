import { Injectable } from '@angular/core';
import { INEO } from 'src/app/data/data.model';
import { BehaviorSubject, Subject, of, Observable } from 'rxjs';
import { tap, shareReplay } from 'rxjs/operators';
import { Router, NavigationEnd } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class StateService {
  private initialState: INEO[] = [];
  private prevState;
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
    // Clear any errors on navigation event
    this.router.events.subscribe(
      event => {
        if (event instanceof NavigationEnd) {
          this.errorSubject.next(null);
        }
      }
    );
  }

  setNeoList(neoList: INEO[]) {
    this.prevState = this.state;
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

  getNeo$(id: string): Observable<INEO> {
    return of(this.neoSubject.getValue().find(
      (neo) => neo.id === id
    ));
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

