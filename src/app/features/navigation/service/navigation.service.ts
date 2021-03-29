import { Injectable } from '@angular/core';
import { ConstantService } from 'src/app/core/constant/constant.service';
import {HelperService} from '../../../core/helper/helper.service';
import {Observable} from 'rxjs';

@Injectable()
export class NavigationService {
  api: any;
  methods: any;
  constructor(private constant: ConstantService,
              private helper: HelperService) {
    this.api = this.constant.apiRoutes;
    this.methods = this.constant.apiMethod;
  }

  getBuyerMenuItems(): Array<any> {
    return this.constant.buyer;
  }
  getLenderMenuItems(): Array<any> {
    return this.constant.lender;
  }
  getRealEstateAgentMenuItems(): Array<any> {
    return this.constant.realEstateAgent;
  }
  getAttorneyMenuItems(): Array<any> {
    return this.constant.attorney;
  }
  getHomeInspectorMenuItems(): Array<any> {
    return this.constant.homeInspector;
  }
  getNotifications(): Observable<any>{
    return this.helper.requestCall(this.methods.get, this.api.getNotifications);
  }
  readNotification(data): Observable<any>{
    return this.helper.requestCall(this.methods.put, this.api.markAsRead, data);
  }
  getUnreadMessages(): Observable<any>{
    return this.helper.requestCall(this.methods.get, this.api.getUnreadMessages);
  }
}
