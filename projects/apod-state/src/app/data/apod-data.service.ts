import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IAPOD } from './apod.model';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  private apiAPODUrl = `https://api.nasa.gov/planetary/apod?hd=true&api_key=${environment.nasaApiKey}`;

  constructor(private http: HttpClient) { }

  getApod$(): Observable<IAPOD> {
    return this.http.get<IAPOD>(this.apiAPODUrl).pipe(
      tap(apod => console.log(apod))
    );
  }
}
