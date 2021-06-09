import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';
import {HelperService} from '../../../../../core/helper/helper.service';
import {ConstantService} from '../../../../../core/constant/constant.service';

@Injectable({
  providedIn: 'root'
})
export class FeedService {
  private apiRoutes;
  private method;
  constructor(private helper: HelperService, private constant: ConstantService) {
    this.apiRoutes = this.constant.apiRoutes;
    this.method = this.constant.apiMethod;
  }
  getNewsFeed(data): Observable<any> {
    return this.helper.requestCall(this.method.get, this.apiRoutes.getNewsFeed + data);
  }
  getPostById(data): Observable<any> {
    return this.helper.requestCall(this.method.get, this.apiRoutes.getPostById + data);
  }
  createPost(data): Observable<any>{
    return this.helper.requestCall(this.method.post, this.apiRoutes.createPost, data);
  }
  updatePost(data, id): Observable<any>{
    return this.helper.requestCall(this.method.put, this.apiRoutes.updatePost + id, data);
  }
  removePost(id): Observable<any>{
    return this.helper.requestCall(this.method.delete, this.apiRoutes.deletePost + id);
  }
}
