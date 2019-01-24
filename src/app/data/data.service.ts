import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError, defer } from 'rxjs';
import { map, tap, catchError, delay } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { INEOAPI, INEO } from 'src/app/data/data.model';
import { StateService } from 'src/app/data/state.service';
import { UtilsService } from 'src/app/data/utils.service';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  private apiNEOUrl = `https://api.nasa.gov/neo/rest/v1/feed?detailed=false&start_date=${this.utils.getNEODate}&end_date=${this.utils.getNEODate}&api_key=${environment.nasaApiKey}`;
  loading = true;

  constructor(
    private state: StateService,
    private http: HttpClient,
    private utils: UtilsService
  ) { }

  getNEOToday$(): Observable<INEO[]> {
    return this.http.get<INEOAPI>(this.apiNEOUrl).pipe(
      delay(1500), // simulate longer server delay
      map(res => this.utils.mapNEOResponse(res)),
      tap(neoList => {
        this.state.updateNEOList(neoList);
        this.loading = false;
      }),
      catchError(err => this.onError(err))
    );
  }

  addNeoNickname$(neo: INEO): Observable<INEO> {
    // Deferred so that the observable will
    // only be created on subscription
    return defer(() => {
      let serverDelay;
      // Make optimistic UI updates
      this.state.updateNeo(neo);
      // Return the observable that "interacts with the server"
      return new Observable<INEO>(observer => {
        serverDelay = setTimeout(() => {
          clearTimeout(serverDelay);
          // Force an error for one particular item
          if (neo.name === '(2018 PV24)') {
            observer.error({
              message: `Could not update nickname for ${neo.name}.`
            });
          } else {
            observer.next(neo);
          }
          observer.complete();
        }, 1500);
      }).pipe(
        catchError(err => this.onError(err))
      );
    });
  }

  onError(err: any) {
    const errorMsg = err.message ? err.message : 'Unable to complete request.';
    this.loading = false;
    this.state.stateError(errorMsg, true);
    return throwError(errorMsg);
  }
}
