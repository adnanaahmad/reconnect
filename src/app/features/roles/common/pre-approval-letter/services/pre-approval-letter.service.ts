import { Injectable } from '@angular/core';
import {ConstantService} from '../../../../../core/constant/constant.service';
import {HelperService} from '../../../../../core/helper/helper.service';
import {LocationService} from '../../../../landing/services/location/location.service';
import {StoreService} from '../../../../../core/store/store.service';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PreApprovalLetterService {
  method: any;
  api: any;
  constructor(private constant: ConstantService,
              private helper: HelperService,
              private location: LocationService,
              private store: StoreService) {
    this.method = this.constant.apiMethod;
    this.api = this.constant.apiRoutes;
  }
  getTemplates(): Observable<any>{
    return this.helper.requestCall(this.method.get, this.api.getPreApprovalTemplates);
  }
  createTemplate(data): Observable<any>{
    return this.helper.requestCall(this.method.post, this.api.createPreApprovalTemplate, data);
  }
  updateTemplate(data, id): Observable<any>{
    return this.helper.requestCall(this.method.put, this.api.updatePreApprovalTemplate + id, data);
  }
  updateTemplateId(data, id): Observable<any>{
    return this.helper.requestCall(this.method.put, this.api.updateTemplateId + id, data);
  }
  removeTemplate(data): Observable<any>{
    return this.helper.requestCall(this.method.delete, this.api.removePreApprovalTemplate + data);
  }
  getTemplateList(data): Observable<any>{
    return this.helper.requestCall(this.method.get, this.api.getTemplatesList + data);
  }
  getPropertyDetails(data): Observable<any>{
    return this.helper.requestCall(this.method.get, this.api.getPropertyDetails + data);
  }
  generateLetter(data): Observable<any>{
    return this.helper.requestCall(this.method.post, this.api.generateLetter, data);
  }
}
