import { Injectable } from '@angular/core';
import {ConstantService} from '../../../../../core/constant/constant.service';
import {HelperService} from '../../../../../core/helper/helper.service';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class QuoteRequestService {
  api: any;
  methods: any;
  constructor(private constant: ConstantService,
              private helper: HelperService) {
    this.api = this.constant.apiRoutes;
    this.methods = this.constant.apiMethod;
  }
  getQuoteRequest(): Observable<any>{
    return this.helper.requestCall(this.methods.get, this.api.professionalRequestQuote);
  }
  // acceptQuoteRequest(data): Observable<any>{
  //   return this.helper.requestCall(this.methods.put, this.api.acceptRequestQuote, data);
  // }
  // rejectQuoteRequest(data): Observable<any>{
  //   return this.helper.requestCall(this.methods.put, this.api.rejectRequestQuote, data);
  // }
  setHomeInspectionDate(data): Observable<any>{
    return this.helper.requestCall(this.methods.put, this.api.homeInspectionDate, data);
  }
  sendQuoteRequest(data): Observable<any>{
    return this.helper.requestCall(this.methods.post, this.api.sendPrivateMessage, data);
  }
}
