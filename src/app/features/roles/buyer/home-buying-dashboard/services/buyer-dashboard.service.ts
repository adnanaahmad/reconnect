import { Injectable } from '@angular/core';
import {ConstantService} from '../../../../../core/constant/constant.service';
import {HelperService} from '../../../../../core/helper/helper.service';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BuyerDashboardService {
  methods: any;
  api: any;
  constructor(private constant: ConstantService, private helper: HelperService) {
    this.methods = this.constant.apiMethod;
    this.api = this.constant.apiRoutes;
  }
  getProfessionals(data: string): Observable<any>{
    return this.helper.requestCall(this.methods.get, `${this.api.getProfessionals}?role=${data}`);
  }
  getTeam(): Observable<any>{
    return this.helper.requestCall(this.methods.get, this.api.getTeam);
  }
  addTeamMember(data): Observable<any>{
    return  this.helper.requestCall(this.methods.put, this.api.addTeamMember, data);
  }
  removeTeamMember(data): Observable<any>{
    return this.helper.requestCall(this.methods.put, this.api.removeTeamMember, data);
  }
  getLoanDetails(): Observable<any>{
    return this.helper.requestCall(this.methods.get, this.api.getLoanDetails);
  }
}
