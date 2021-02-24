import { Component, OnInit } from '@angular/core';
import {ConstantService} from '../../../../../../core/constant/constant.service';
import {SavedSearchesModel} from '../../models/saved-searches.model';
import {Router} from '@angular/router';
import {StoreService} from '../../../../../../core/store/store.service';
import {KeyValue} from '@angular/common';
import {HelperService} from '../../../../../../core/helper/helper.service';
import {SavedSearchService} from '../../services/saved-search.service';
import {take} from 'rxjs/operators';
import {ToastrService} from 'ngx-toastr';


@Component({
  selector: 'app-saved-searches',
  templateUrl: './saved-searches.component.html',
  styleUrls: ['./saved-searches.component.scss']
})
export class SavedSearchesComponent implements OnInit {
  savedSearch: Array<SavedSearchesModel> = {} as Array<SavedSearchesModel>;
  loader: boolean;
  constructor(public constant: ConstantService,
              private router: Router,
              private store: StoreService,
              public helper: HelperService,
              private savedSearchService: SavedSearchService,
              private toaster: ToastrService) { }

  ngOnInit(): void {
    this.loader = false;
    this.getSavedSearches();
  }
  getSavedSearches(): void{
    this.savedSearchService.getSavedSearches().pipe(take(1)).subscribe(res => {
      console.log(res);
      this.loader = true;
      this.savedSearch = res.result;
      console.log(this.savedSearch);
    }, error => {
      console.log(error);
    });
  }
  objectValuesNull(value): boolean{
    return !Object.values(value).every(o => o === null);
  }

  openPropertySearch(value): void{
    const data = this.filtersDataToQuery(value);
    this.router.navigateByUrl(`/home/searchHomes?${data}`).then();
  }
  filtersDataToQuery(data): {}{
    Object.keys(data).forEach(key => {
      if (data[key] ? data[key].length === 0 : true){
        delete data[key];
      }
    });
    console.log('data', data);
    return Object.keys(data).map(key => key + '=' + data[key]).join('&');
  }
  deleteSearch(id): void{
    this.savedSearchService.deleteSavedSearches(id).pipe(take(1)).subscribe(res => {
      this.toaster.success('Successfully Deleted');
      this.savedSearch = res.result;
    }, error => {
      this.toaster.error('Failed To Delete');
    });
  }
  checkRangeExist =  (value): boolean => {
    return String(value).includes(':');
  }
  editPropertySearch(value, id): void{
    const data = this.filtersDataToQuery(value);
    this.router.navigateByUrl(`/home/searchHomes?${data}${ data ? '&' : ''}savedSearchId=${id}`).then();
  }
}
