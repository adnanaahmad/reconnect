import {Component, Input, OnInit} from '@angular/core';
import {StoreService} from '../../../../../../core/store/store.service';

@Component({
  selector: 'app-more-filters',
  templateUrl: './more-filters.component.html',
  styleUrls: ['./more-filters.component.scss']
})
export class MoreFiltersComponent implements OnInit {
  @Input() searchHome;
  constructor(private store: StoreService) { }

  ngOnInit(): void {
    this.searchHome.keywordList = this.searchHome.moreFilters.value.moreFilters.keywords;
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
    this.store.updateSavedSearch(this.searchHome.moreFilters.value);
  }
}
