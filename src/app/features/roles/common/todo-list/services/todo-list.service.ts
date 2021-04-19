import { Injectable } from '@angular/core';
import {HelperService} from '../../../../../core/helper/helper.service';
import {ConstantService} from '../../../../../core/constant/constant.service';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TodoListService {
  private api: any;
  private methods: any;
  constructor(private helper: HelperService,
              private constant: ConstantService) {
    this.api = this.constant.apiRoutes;
    this.methods = this.constant.apiMethod;
  }
  getCalendarCategories(): Observable<any>{
    return this.helper.requestCall(this.methods.get, this.api.getCalendarCategories);
  }
  getTodoList(): Observable<any>{
    return this.helper.requestCall(this.methods.get, this.api.getTodo);
  }
  createTodo(data): Observable<any>{
    return this.helper.requestCall(this.methods.post, this.api.createTodo, data);
  }
  editTodo(data, id): Observable<any>{
    return this.helper.requestCall(this.methods.put, this.api.updateTodo + id, data);
  }
  editTags(data, id): Observable<any>{
    return this.helper.requestCall(this.methods.put, this.api.updateTodoTags + id, data);
  }
}
