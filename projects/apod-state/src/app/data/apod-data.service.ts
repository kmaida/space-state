import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IAPOD, IUPDATE } from './apod.model';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { tap } from 'rxjs/operators';
import { StateService } from './apod-state.service';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  private apiAPODUrl = `https://api.nasa.gov/planetary/apod?hd=true&api_key=${environment.nasaApiKey}`;

  constructor(
    private http: HttpClient,
    private state: StateService
  ) { }

  apodData$(): Observable<IAPOD> {
    return this.http.get<IAPOD>(this.apiAPODUrl).pipe(
      tap(apod => this.state.setStore(apod))
    );
  }

  get getApod$(): Observable<IAPOD> {
    return this.state.apodStore$;
  }

  addStars(starsObj: IUPDATE) {
    this.state.setStore(starsObj);
  }
}
