import {Directive, HostListener} from '@angular/core';
import {StoreService} from '../../../core/store/store.service';

@Directive({
  selector: '[appHidePopup]'
})
export class HidePopupDirective {
  constructor(private store: StoreService) {
  }
  @HostListener('click', ['$event'])
  hidePopup(event): void {
    if (!((event.target as HTMLElement).closest('div.more-filter') ||
      (event.target as HTMLElement).closest('div.notification') ||
      (event.target as HTMLElement).closest('div.buyer-div.align-self-end'))
      && !((event.target as HTMLElement).closest('div.filter-menu') ||
        (event.target as HTMLElement).closest('img.bell.align-self-center') ||
        (event.target as HTMLElement).closest('div.date-cards'))){
      this.store.updateToggleMoreFilter(false);
      this.store.updateToggleNotification(false);
      const elements = Array.from(document.getElementsByClassName('buyer-div align-self-end') as HTMLCollectionOf<HTMLElement>)
      for (const item of elements) {
        item.style.display = 'none';
      }
    }
    // if (document.getElementById('search-list')){
    //   document.getElementById('search-list').style.display = 'none';
    // }
  }

}
