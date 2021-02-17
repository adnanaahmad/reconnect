import {FormControl, FormGroup} from '@angular/forms';
import {HomeModel} from '../../../buyer/favorites/models/favorites.model';
import {BehaviorSubject, Subject} from 'rxjs';

export interface SearchHomesModel {
  searchKeyword: FormControl;
  autoComplete: BehaviorSubject<any>;
  moreFilters: FormGroup;
  homes: Array<HomeModel>;
  toggle: boolean;
  approvedLoanProgram: ApprovedLoanProgramModel;
  hideSearch: boolean;
  total: number;
  pageNumber: number;
  sortBy: FormControl;
  keywordList: Array<string>;
  keyword: FormControl;
  loan: any;
}
interface ApprovedLoanProgramModel {
  fha: boolean;
  va: boolean;
  usda: boolean;
  conventional: boolean;
  homeReady: boolean;
  homePossible: boolean;
}
export interface MoreFiltersModel{
  minPrice: Array<number>;
  maxPrice: Array<number>;
  minBeds: Array<number>;
  maxBeds: Array<number>;
  minBaths: Array<number>;
  maxBaths: Array<number>;
}
