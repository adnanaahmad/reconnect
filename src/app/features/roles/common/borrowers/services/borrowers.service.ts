import { Injectable } from '@angular/core';
import {HelperService} from '../../../../../core/helper/helper.service';
import {ConstantService} from '../../../../../core/constant/constant.service';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BorrowersService {
  api: any;
  methods: any;
  constructor( private helper: HelperService,
               private constant: ConstantService) {
    this.api = this.constant.apiRoutes;
    this.methods = this.constant.apiMethod;
  }
  getBorrowers(): Observable<any>{
    return this.helper.requestCall(this.methods.get, this.api.getBorrowers);
  }
  sendInvite(data): Observable<any>{
    return this.helper.requestCall(this.methods.post, this.api.sendInvite, data);
  }
}
