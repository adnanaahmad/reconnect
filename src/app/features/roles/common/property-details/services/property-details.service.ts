import { Injectable } from '@angular/core';
import {HelperService} from '../../../../../core/helper/helper.service';
import {ConstantService} from '../../../../../core/constant/constant.service';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PropertyDetailsService {
  api: any;
  methods: any;
  constructor(private helper: HelperService, private constant: ConstantService) {
    this.api = this.constant.apiRoutes;
    this.methods = this.constant.apiMethod;
  }
  getPropertyDetails(data): Observable<any>{
    return this.helper.requestCall(this.methods.get, this.api.getPropertyDetails + data);
  }
  getTeam(): Observable<any>{
    return this.helper.requestCall(this.methods.get, this.api.getTeam);
  }
  shareOrBookProperty(data): Observable<any>{
    return this.helper.requestCall(this.methods.post, this.api.shareProperty, data);
  }
}
