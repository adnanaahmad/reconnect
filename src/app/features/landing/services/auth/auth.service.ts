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
  completeRegistration(data): Observable<any>{
    return  this.helper.requestCall(this.method.post, this.apiRoutes.completeRegistration, data);
  }
  helperToggle(password, toggle): void{
    const element = password as HTMLInputElement;
    const image = toggle as HTMLImageElement;
    if (element.type === 'password') {
      element.type = 'text';
      image.src = '/assets/password/Hide.svg';
    } else {
      element.type = 'password';
      image.src = '/assets/password/Show.svg';
    }
  }
  forgotPassword(data: string): Observable<any>{
    return this.helper.requestCall(this.method.post, this.apiRoutes.forgotPassword, data);
  }
  resetPassword(data): Observable<any>{
    return  this.helper.requestCall(this.method.post, this.apiRoutes.resetPassword, data);
  }
  getFeaturedHomes(): Observable<any>{
    return  this.helper.requestCall(this.method.get, this.apiRoutes.getFeaturedHomes);
  }
  editEmail(): Observable<any>{
    return this.helper.requestCall(this.method.put, this.apiRoutes.changeEmailConfirm);
  }
}
