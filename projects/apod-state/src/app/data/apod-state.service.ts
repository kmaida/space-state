import { Injectable } from '@angular/core';
import { IAPOD, ISTATE } from './apod.model';
import { BehaviorSubject } from 'rxjs';
import { scan, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class StateService {
  private initialState: IAPOD = null;
  private apodSubject = new BehaviorSubject(this.initialState);
  apodStore$ = this.apodSubject.pipe(
    scan((acc: IAPOD, newVal: ISTATE) => {
      console.log(acc, newVal);
      return { ...acc, ...newVal };
    }, this.initialState),
    tap(
      val => console.log(val.stars)
    )
  );

  constructor() { }

  setApod(apod: IAPOD) {
    this.apodSubject.next(apod);
  }

  updateApod(apodObj) {
    this.apodSubject.next(apodObj);
  }

}
