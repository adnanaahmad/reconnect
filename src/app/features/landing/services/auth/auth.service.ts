import { Injectable } from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs';
import {HelperService} from '../../../../core/helper/helper.service';
import {ConstantService} from '../../../../core/constant/constant.service';
//
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  apiRoutes: any;
  method: any;
  private searchNameSubject = new BehaviorSubject<any>(1);
  searchName = this.searchNameSubject.asObservable();
  constructor(private helper: HelperService, private constant: ConstantService) {
    this.apiRoutes = this.constant.apiRoutes;
    this.method = this.constant.apiMethod;
  }
  updateSearchName(data): void{
    this.searchNameSubject.next(data);
  }
  signUp(data): Observable<any> {
    return this.helper.requestCall(this.method.post, this.apiRoutes.signup, data);
  }
  signIn(data): Observable<any> {
    return this.helper.requestCall(this.method.post, this.apiRoutes.signin, data);
  }
  referenceList(data): Observable<any> {
    return  this.helper.requestCall(this.method.get, `${this.apiRoutes.searchReference}?name=${data}`);
  }

}
