import { Injectable } from '@angular/core';
import { INEO } from 'src/app/data/data.model';
import { BehaviorSubject, Subject } from 'rxjs';
import { UtilsService } from 'src/app/data/utils.service';
import { scan, shareReplay } from 'rxjs/operators';
import { Router, NavigationEnd } from '@angular/router';



// interface Action<T=any> {
//   type: string;
//   payload?: T
// }

// const actions = new BehaviorSubject<Action>({ type: 'INIT' });


// const states = actions.pipe(scan((state, action) => {
//   switch (action.type) {
//     case 'INC':
//       return { ...state, count: state.count + 1 };
//     case 'DEC':
//       return { ...state, count: state.count - 1 };
//     default:
//       return state;
//   }
// }, INITIAL_STATE));



// /**
//  *
//  * EventBus (actions subject) -> StateManager (scan)
//  *      |-> Side Effect (actions -> new Observable<Action>) -> EventBus
//  */


// let loadEvents: Observable<any> = null;

// function getNasaData(): Observable<{}> {
//   return null!;
// }

// let prevState: any;

// an event that wants to load data
// loadEvents.pipe(
//   tap(updateOptimistically),
//   // load the data
//   concatMap(() => getNasaData().pipe(
//     // if successful, update the previous state.
//     tap((data) => prevState = data)
//     // isolate errors with the load, and return the previous state if there's a problem.
//     catchError(err => of(prevState))
//   )),
// )



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
  neo$ = this.neoSubject.pipe(
    scan((prev: INEO[], newState: INEO[]) => {
      this.prevState = prev;
      this.state = [...newState];
      return this.state;
    }, this.initialState)
    // tap(state => this.prevState = state.slice()),
  );
  errors$ = this.errorSubject.pipe(
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
    const newState = currentState.map((current) => {
      if (current.id === neobj.id) {
        return { ...current, ...neobj };
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

