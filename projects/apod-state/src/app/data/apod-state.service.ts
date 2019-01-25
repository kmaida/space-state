import { Injectable } from '@angular/core';
import { IAPOD, ISTATE } from './apod.model';
import { BehaviorSubject } from 'rxjs';
import { scan } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class StateService {
  private initialState: IAPOD = null;
  private apodSubject = new BehaviorSubject(this.initialState);
  apodStore$ = this.apodSubject.pipe(
    scan((acc: IAPOD, newVal: ISTATE) => {
      return { ...acc, ...newVal };
    }, this.initialState)
  );

  constructor() { }

  setApod(apod: IAPOD) {
    this.apodSubject.next(apod);
  }

  updateApod(apodObj: IAPOD) {
    this.apodSubject.next(apodObj);
  }

}
