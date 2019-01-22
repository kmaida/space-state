import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
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

  constructor(
    private data: DataService,
    private http: HttpClient,
    private utils: UtilsService
  ) { }

  getNEOToday$(): Observable<INEO[]> {
    return this.http.get<INEOAPI>(this.apiNEOUrl).pipe(
      delay(2000),
      map(res => this.utils.mapNEOResponse(res)),
      tap(neoList => this.data.updateNEOList(neoList)),
      catchError(err => this.onError(err))
    );
  }

  private onError(err: HttpErrorResponse | any) {
    let errorMsg = 'Unable to complete request.';
    if (err instanceof HttpErrorResponse) {
      errorMsg = err.message;
    }
    this.data.stateError(errorMsg, true);
    return throwError(errorMsg);
  }
}
