import { Injectable } from '@angular/core';
import {ConstantService} from '../../../../../core/constant/constant.service';
import {HelperService} from '../../../../../core/helper/helper.service';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ChatService {
  api: any;
  methods: any;
  constructor(private constant: ConstantService,
              private helper: HelperService) {
    this.methods = this.constant.apiMethod;
    this.api = this.constant.apiRoutes;
  }
  getConversation(): Observable<any>{
    return this.helper.requestCall(this.methods.get, this.api.getConversation);
  }
  getTeamsData(): Observable<any>{
    return this.helper.requestCall(this.methods.get, this.api.getTeam);
  }
  getBorrowers(): Observable<any>{
    return this.helper.requestCall(this.methods.get, this.api.getBorrowers);
  }
  createGroupConversation(data): Observable<any>{
    return this.helper.requestCall(this.methods.post, this.api.getConversation, data);
  }
  getMessages(data): Observable<any>{
    return this.helper.requestCall(this.methods.get, `${this.api.getMessages}/${data}`);
  }
  editConversation(data, id): Observable<any>{
    return this.helper.requestCall(this.methods.put, this.api.getConversation + `/${id}`, data);
  }
  getTeamById(data): Observable<any>{
    return this.helper.requestCall(this.methods.get, this.api.getTeamById + `/${data}`);
  }
}
