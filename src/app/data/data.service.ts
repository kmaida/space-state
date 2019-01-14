import { Injectable } from '@angular/core';
import { INEO } from './data.interface';
import { BehaviorSubject } from 'rxjs';
import { freezeArray } from './utils';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  private stateNEO: INEO[] = null;
  private stateNEO$ = new BehaviorSubject<INEO[]>(this.stateNEO);
  private errorMsg$ = new BehaviorSubject<string>(null);
  neo$ = this.stateNEO$.asObservable();
  errors$ = this.errorMsg$.asObservable();

  constructor() { }

  updateNEO(neo: INEO) {

  }

  error(errMsg: string) {
    this.errorMsg$.next(errMsg);
  }
}
