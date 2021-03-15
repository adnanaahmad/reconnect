import {Injectable, OnDestroy} from '@angular/core';
import {Observable, Subscription} from 'rxjs';
import {HttpClient, HttpHeaders} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class LocationService implements OnDestroy {
  subscription: Subscription;
  constructor(private http: HttpClient) { }
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  authToken(): Observable<any> {
    const apiURL = 'https://www.universal-tutorial.com/api/getaccesstoken';
    const httpOptions = {
      headers: new HttpHeaders({
        Accept: 'application/json',
        'api-token': 'vJrA8D7GJ2LGoKwNmsSWCDQ4r_IcPiRfGWncd0ZOE4LOdvtRGakXSbYkJKFzk8p1teg',
        'user-email': 'lightcoldlhr@gmail.com'
      })
    };
    return this.http.get(apiURL, httpOptions);
  }
  getStates(token): Observable<any> {
    const apiURL = 'https://www.universal-tutorial.com/api/states/United States';
    const httpOptions = {
      headers: new HttpHeaders({
        authorization: 'Bearer ' + token,
        Accept: 'application/json'
      })
    };
    return this.http.get(apiURL, httpOptions);
  }
  getCities(state, token): Observable<any> {
    const apiURL = 'https://www.universal-tutorial.com/api/cities/' + state;
    const httpOptions = {
      headers: new HttpHeaders({
        authorization: 'Bearer ' + token,
        Accept: 'application/json'
      })
    };
    return this.http.get(apiURL, httpOptions);
  }
  saveLocationApiToken(): void{
    this.subscription = this.authToken().subscribe(res => {
      localStorage.setItem('locationApiToken', res.auth_token);
      }, error => {
        console.log(error);
    });
  }
}
