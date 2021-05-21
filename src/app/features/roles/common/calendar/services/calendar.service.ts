import { Injectable } from '@angular/core';
import {HelperService} from '../../../../../core/helper/helper.service';
import {ConstantService} from '../../../../../core/constant/constant.service';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CalendarService {
  api: any;
  methods: any;
  constructor(private helper: HelperService,
              private constant: ConstantService) {
    this.api = this.constant.apiRoutes;
    this.methods = this.constant.apiMethod;
  }
  getCalendarEvents(): Observable<any>{
    return this.helper.requestCall(this.methods.get, this.api.getCalendarEvents);
  }
  createEvent(data): Observable<any>{
    return this.helper.requestCall(this.methods.post, this.api.createCalendarEvent, data);
  }
  createCategory(data): Observable<any>{
    return this.helper.requestCall(this.methods.post, this.api.createCalendarEventCategory, data);
  }
  editCalendarEvent(data, id): Observable<any>{
    return this.helper.requestCall(this.methods.put, this.api.editCalendarEvent + id, data);
  }
  removeEventCategory(id): Observable<any>{
    return this.helper.requestCall(this.methods.delete, this.api.removeEventCategory + id);
  }
  removeEvent(id): Observable<any>{
    return this.helper.requestCall(this.methods.delete, this.api.removeEvent + id);
  }
  getUserDataById(data): Observable<any>{
    return this.helper.requestCall(this.methods.get, `${this.api.viewBuyer}?userId=${data}` );
  }
}
