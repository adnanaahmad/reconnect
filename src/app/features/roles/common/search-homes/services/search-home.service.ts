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
}
