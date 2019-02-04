import { Injectable } from '@angular/core';
import { IAPOD, IUPDATE } from './apod.model';
import { BehaviorSubject } from 'rxjs';
import { scan } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class StateService {
  private initialState = null;
  private apodSubject = new BehaviorSubject(this.initialState);
  apodStore$ = this.apodSubject.pipe(
    scan((acc: IAPOD, newVal: IAPOD|IUPDATE) => {
      return { ...acc, ...newVal };
    }, this.initialState)
  );

  constructor() { }

  setStore(obj: IAPOD|IUPDATE) {
    this.apodSubject.next(obj);
  }

}
