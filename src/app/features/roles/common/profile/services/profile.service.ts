import { Injectable } from '@angular/core';
import {ConstantService} from '../../../../../core/constant/constant.service';
import {Observable} from 'rxjs';
import {HelperService} from '../../../../../core/helper/helper.service';
import {HttpHeaders} from '@angular/common/http';
import {LocationService} from '../../../../landing/services/location/location.service';
import {StoreService} from '../../../../../core/store/store.service';
import {take} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {
  method: any;
  api: any;
  constructor(private constant: ConstantService,
              private helper: HelperService,
              private location: LocationService,
              private store: StoreService) {
    this.method = this.constant.apiMethod;
    this.api = this.constant.apiRoutes;
  }
  getUserData(): Observable<any>{
    return this.helper.requestCall(this.method.get, this.api.viewBuyer);
  }
  getUserDataById(data): Observable<any>{
    return this.helper.requestCall(this.method.get, `${this.api.viewBuyer}?userId=${data}` );
  }
  uploadProfilePicture(data): Observable<any>{
    const formData: FormData = new FormData();
    formData.append('picture', data, data.name);
    formData.append('profile', 'true');
    return this.helper.requestCall(this.method.post, this.api.uploadProfilePicture, formData);
  }
  uploadCompanyPicture(data): Observable<any>{
    const formData: FormData = new FormData();
    formData.append('picture', data, data.name);
    formData.append('company', 'true');
    return this.helper.requestCall(this.method.post, this.api.uploadProfilePicture, formData);
  }
  saveProfile(data): Observable<any>{
    return this.helper.requestCall(this.method.put, this.api.editBuyer, data);
  }
  changeState(state, user): void {
    this.location.getCities(state).pipe(take(1)).subscribe(res => {
      user.cities = res;
    });
  }

  setCity(state, user): void {
    this.location.getCities(state).pipe(take(1)).subscribe(res1 => {
      user.cities = res1;
    }, error => {
      console.log(error);
    });
  }
  getLocation(user): void {
    this.location.getStates().pipe(take(1)).subscribe(response => {
      response = response.sort((a, b) => {
        if (a.name < b.name) { return -1; }
        if (a.name > b.name) { return 1; }
        return 0;
      });
      user.states = response;
    }, error => {
      console.log(error);
    });
  }
  editEmail(data): Observable<any>{
     return this.helper.requestCall(this.method.put, this.api.changeEmailRequest, data);
  }
}
