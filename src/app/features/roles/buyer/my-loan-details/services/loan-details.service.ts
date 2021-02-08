import { Injectable } from '@angular/core';
import {ConstantService} from '../../../../../core/constant/constant.service';
import {HelperService} from '../../../../../core/helper/helper.service';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoanDetailsService {
  methods: any;
  api: any;
  constructor(private constant: ConstantService,
              private helper: HelperService) {
    this.methods = this.constant.apiMethod;
    this.api = this.constant.apiRoutes;
  }

  getLoanDetails(): Observable<any>{
    return this.helper.requestCall(this.methods.get, this.api.getLoanDetails);
  }
  setLoanDetails(data): Observable<any>{
    return this.helper.requestCall(this.methods.put, this.api.getLoanDetails, data);
  }
}
