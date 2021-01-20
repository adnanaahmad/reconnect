import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';
import {HelperService} from '../../../../core/helper/helper.service';
import {ConstantService} from '../../../../core/constant/constant.service';
//
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  apiRoutes: any;
  method: any;
  constructor(private helper: HelperService, private constant: ConstantService) {
    this.apiRoutes = this.constant.apiRoutes;
    this.method = this.constant.apiMethod;
  }
  signup(data): Observable<any> {
    return this.helper.requestCall(this.method.post, this.apiRoutes.signup, data);
  }
}
