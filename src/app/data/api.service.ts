import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { map, tap, catchError, delay } from 'rxjs/operators';
import { environment } from './../../environments/environment';
import { INEOAPI, INEO } from './data.model';
import { DataService } from './data.service';
import { UtilsService } from './utils.service';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private apiNEOUrl = `https://api.nasa.gov/neo/rest/v1/feed?detailed=false&start_date=${this.utils.getNEODate}&end_date=${this.utils.getNEODate}&api_key=${environment.nasaApiKey}`;
  loading = true;

  constructor(
    private data: DataService,
    private http: HttpClient,
    private utils: UtilsService
  ) { }

  getNEOToday$(): Observable<INEO[]> {
    return this.http.get<INEOAPI>(this.apiNEOUrl).pipe(
      delay(1500), // simulate longer server delay
      map(res => this.utils.mapNEOResponse(res)),
      tap(neoList => {
        this.data.updateNEOList(neoList);
        this.loading = false;
      }),
      catchError(err => this.onError(err))
    );
  }

  addNeoNickname$(neo: INEO): Observable<INEO> {
    // Make optimistic UI updates
    this.data.updateNeo(neo);
    // Nickname update observable
    const subscriber = (observer) => {
      if (neo.name === '(2018 PV24)') {
        // Force an error
        observer.error({
          message: `Could not update nickname for ${neo.name}.`
        });
      } else {
        observer.next(neo);
      }
      observer.complete();
    };
    const obs$: Observable<INEO> = new Observable(subscriber);
    return obs$.pipe(
      delay(2000),  // @TODO: only success is delayed, not errors
      catchError(err => this.onError(err))
    );
  }

  onError(err: any) {
    const errorMsg = err.message ? err.message : 'Unable to complete request.';
    this.loading = false;
    this.data.stateError(errorMsg, true);
    return throwError(errorMsg);
  }
}
