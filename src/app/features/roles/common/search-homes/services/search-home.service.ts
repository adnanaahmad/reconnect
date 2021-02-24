import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';
import {ConstantService} from '../../../../../core/constant/constant.service';
import {HelperService} from '../../../../../core/helper/helper.service';

@Injectable({
  providedIn: 'root'
})
export class SearchHomeService {
  methods: any;
  api: any;
  constructor(private constant: ConstantService,
              private helper: HelperService) {
    this.methods = this.constant.apiMethod;
    this.api = this.constant.apiRoutes;
  }
  getHouses(data?): Observable<any>{
    return this.helper.requestCall(this.methods.get, this.api.getHouses + data);
  }
  searchHomeByName(data): Observable<any> {
    return this.helper.requestCall(this.methods.get, this.api.searchHomeByName + data);
  }
  addFavorite(data): Observable<any>{
    return this.helper.requestCall(this.methods.post, this.api.getFavorites, data);
  }
  removeFavorite(data): Observable<any>{
    return this.helper.requestCall(this.methods.delete, this.api.getFavorites + `/${data}`);
  }
  saveSearch(data): Observable<any>{
    return this.helper.requestCall(this.methods.post, this.api.savedSearches, data);
  }
  updateSearch(data, id): Observable<any>{
    return this.helper.requestCall(this.methods.put, this.api.savedSearches + `/${id}`, data);
  }
}
