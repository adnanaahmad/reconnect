import {Injectable, OnDestroy} from '@angular/core';
import {Observable, Subscription} from 'rxjs';
import {HttpClient, HttpHeaders} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class LocationService implements OnDestroy {
  subscription: Subscription;
  locationApiKey: string;
  constructor(private http: HttpClient) {
    this.locationApiKey = 'a1BrWkliTDlFeFQ1MGhCQ1owM1dCNzFRM2hkYnhaeXpNTDQ3b0JIeA==';
  }
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
  getStates(): Observable<any> {
    const apiURL = 'https://api.countrystatecity.in/v1/countries/US/states';
    const httpOptions = {
      headers: new HttpHeaders({
        'X-CSCAPI-KEY': this.locationApiKey,
        Accept: 'application/json'
      })
    };
    return this.http.get(apiURL, httpOptions);
  }
  getCities(state): Observable<any> {
    const apiURL = `https://api.countrystatecity.in/v1/countries/US/states/${state}/cities`;
    const httpOptions = {
      headers: new HttpHeaders({
        'X-CSCAPI-KEY': this.locationApiKey,
        Accept: 'application/json'
      })
    };
    return this.http.get(apiURL, httpOptions);
  }
}
