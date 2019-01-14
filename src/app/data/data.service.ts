import { Injectable } from '@angular/core';
import { INEO } from './data.interface';
import { BehaviorSubject } from 'rxjs';
import { UtilsService } from './utils.service';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  private stateNEO: INEO[] = null;
  private stateNEO$ = new BehaviorSubject<INEO[]>(this.stateNEO);
  private errorMsg$ = new BehaviorSubject<string>(null);
  neo$ = this.stateNEO$.asObservable();
  errors$ = this.errorMsg$.asObservable();

  constructor(private utils: UtilsService) { }

  updateNEOList(neoList: INEO[]) {
    this.stateNEO = [...neoList];
    this.stateNEO$.next(this.stateNEO);
  }

  updateNEO(neoObj: INEO) {
    // Freeze the array so its objects cannot be mutated
    const state = this.utils.freezeArray([...this.stateNEO]);
    const index = state.findIndex(o => neoObj.name === o.name);
    const newState = state.map((obj, i) => {
      if (i === index) {
        return Object.assign({}, obj, { favorite: true });
      }
      return obj;
    });
    this.stateNEO = newState;
    this.stateNEO$.next(this.stateNEO);
    this.errorMsg$.next(null);
  }

  error(errMsg: string) {
    this.errorMsg$.next(errMsg);
  }
}
