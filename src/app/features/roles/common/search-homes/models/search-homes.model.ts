import {FormControl, FormGroup} from '@angular/forms';
import {HomeModel} from '../../../buyer/favorites/models/favorites.model';

export interface SearchHomesModel {
  keyword: FormControl;
  moreFilters: FormGroup;
  keywordList: Array<string>;
  homes: Array<HomeModel>;
  toggle: boolean;
  approvedLoanProgram: ApprovedLoanProgramModel;
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
