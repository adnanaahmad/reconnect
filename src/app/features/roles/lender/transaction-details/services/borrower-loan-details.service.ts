import { Injectable } from '@angular/core';
import {ConstantService} from '../../../../../core/constant/constant.service';
import {HelperService} from '../../../../../core/helper/helper.service';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BorrowerLoanDetailsService {
  api: any;
  methods: any;
  constructor(private constant: ConstantService,
              private helper: HelperService) {
    this.api = this.constant.apiRoutes;
    this.methods = this.constant.apiMethod;
  }
  getBorrowerLoanDetails(data): Observable<any>{
    return this.helper.requestCall(this.methods.get, this.api.getBorrowerLoanDetails + data + '?targetPropertyDetails=true');
  }
  saveLoanDetails(data): Observable<any>{
    return this.helper.requestCall(this.methods.put, this.api.saveBorrowerLoanDetails, data);
  }
}
