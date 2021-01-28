import { Injectable } from '@angular/core';
import {ConstantService} from '../../../../../core/constant/constant.service';
import {Observable} from 'rxjs';
import {HelperService} from '../../../../../core/helper/helper.service';
import {HttpHeaders} from '@angular/common/http';
import {LocationService} from '../../../../landing/services/location/location.service';
import {StoreService} from '../../../../../core/store/store.service';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {
  method: any;
  api: any;
  STATIC_FILES_URL = 'http://1bce0d84ecb7.ngrok.io/public/';
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
    this.location.getCities(state, this.store.getLocationApiToken()).subscribe(res => {
      user.cities = res;
    });
  }

  setCity(state, user): void {
    this.location.getCities(state, this.store.getLocationApiToken()).subscribe(res1 => {
      user.cities = res1;
    }, error => {
      console.log(error);
    });
  }
  getLocation(user): void {
    this.location.getStates(this.store.getLocationApiToken()).subscribe(response => {
      user.states = response;
    }, error => {
      console.log(error);
    });
  }
}
