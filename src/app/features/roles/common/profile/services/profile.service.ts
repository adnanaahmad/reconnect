import { Injectable } from '@angular/core';
import {ConstantService} from '../../../../../core/constant/constant.service';
import {Observable} from 'rxjs';
import {HelperService} from '../../../../../core/helper/helper.service';
import {HttpHeaders} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {
  method: any;
  api: any;
  STATIC_FILES_URL = 'http://d7580b622588.ngrok.io/public/';
  constructor(private constant: ConstantService, private helper: HelperService) {
    this.method = this.constant.apiMethod;
    this.api = this.constant.apiRoutes;
  }
  getUserData(): Observable<any>{
    return this.helper.requestCall(this.method.get, this.api.viewBuyer);
  }
  uploadProfilePicture(data): Observable<any>{
    const formData: FormData = new FormData();
    formData.append('profilePicture', data, data.name);
    return this.helper.requestCall(this.method.post, this.api.uploadProfilePicture, formData);
  }
  saveProfile(data): Observable<any>{
    return this.helper.requestCall(this.method.put, this.api.editBuyer, data);
  }
}
