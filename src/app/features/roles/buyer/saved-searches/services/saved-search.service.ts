import { Injectable } from '@angular/core';
import {HelperService} from '../../../../../core/helper/helper.service';
import {ConstantService} from '../../../../../core/constant/constant.service';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SavedSearchService {
  api: any;
  methods: any;
  constructor(private helper: HelperService,
              private constant: ConstantService) {
    this.api = this.constant.apiRoutes;
    this.methods = this.constant.apiMethod;
  }
  getSavedSearches(): Observable<any>{
    return this.helper.requestCall(this.methods.get, this.api.savedSearches);
  }
  deleteSavedSearches(data): Observable<any>{
    return this.helper.requestCall(this.methods.delete, this.api.savedSearches + `/${data}`);
  }
}
