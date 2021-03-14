import {Component, EventEmitter, Input, OnDestroy, OnInit, Output} from '@angular/core';
import {StoreService} from '../../../../../../core/store/store.service';
import {MoreFiltersModel} from '../../models/search-homes.model';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-more-filters',
  templateUrl: './more-filters.component.html',
  styleUrls: ['./more-filters.component.scss']
})
export class MoreFiltersComponent implements OnInit, OnDestroy {
  @Input() searchHome;
  @Output() applyFilters =  new EventEmitter<any>();
  moreFilters: MoreFiltersModel;
  subscription: Subscription;
  constructor(private store: StoreService) { }

  ngOnInit(): void {
    this.moreFilters = {} as MoreFiltersModel;
    this.initialisePriceFilter();
    this.initialiseBedFilter();
    this.initialiseBathFilter();
    this.searchHome.keywordList = this.searchHome.moreFilters.value.moreFilters.keywords;
  }
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  initialiseBathFilter(): void{
    this.helper('minBaths', 'maxBaths', 5, 1, 'baths');
  }
  initialiseBedFilter(): void{
    this.helper('minBeds', 'maxBeds', 5, 1, 'beds');
  }
  initialisePriceFilter(): void{
    this.helper('minPrice', 'maxPrice', 40, 25000, 'listPrice');
  }
  helper(minArray, maxArray, length, value, object): void{
    this.moreFilters[minArray] = Array(length).fill(1).map((x, i) => (i + 1) * value);
    this.moreFilters[maxArray] = Array(length).fill(1).map((x, i) => (i + 1) * value);
    if (this.searchHome.moreFilters.get([object, 'from']).value){
      this.searchHome.moreFilters.get([object, 'to']).enable();
      this.moreFilters[maxArray] = [...this.moreFilters[minArray]].slice(this.searchHome.moreFilters.
      get([object, 'from']).value / value , length);
    }
    this.subscription = this.searchHome.moreFilters.get([object, 'from']).valueChanges.subscribe(res => {
      this.searchHome.moreFilters.get([object, 'to']).enable();
      this.searchHome.moreFilters.get([object, 'to']).setValue(null);
      this.moreFilters[maxArray] = [...this.moreFilters[minArray]].slice(res / value , length);
    }, error => {
      console.log(error);
    });
  }
  addKeyword(): void {
    this.searchHome.keywordList.push(this.searchHome.keyword.value);
    this.searchHome.moreFilters.patchValue({
      moreFilters: {
        keywords: this.searchHome.keywordList
      }
    });
    this.searchHome.keyword.setValue('');
  }

  deleteKeyword(value): void{
    const index = this.searchHome.keywordList.indexOf(value);
    if (index > -1) {
      this.searchHome.keywordList.splice(index, 1);
    }
    this.searchHome.moreFilters.patchValue({
      moreFilters: {
        keywords: this.searchHome.keywordList
      }
    });
  }
  clearAll(): void{
    this.searchHome.moreFilters.reset();
  }
  applyFilter(): void{
    this.applyFilters.emit();
  }
}
