import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {BorrowersDateModel} from '../../models/dashboard.model';
import {HelperService} from '../../../../../../core/helper/helper.service';

@Component({
  selector: 'app-borrowers-dates',
  templateUrl: './borrowers-dates.component.html',
  styleUrls: ['./borrowers-dates.component.scss']
})
export class BorrowersDatesComponent implements OnInit {
  @Input() buyerAnalytics: any;
  constructor(public helper: HelperService) { }
  ngOnInit(): void {}
  toggleCard(event): void{
    // close all
    const elements = Array.from(document.getElementsByClassName('buyer-div align-self-end') as HTMLCollectionOf<HTMLElement>)
    for (const item of elements) {
      if (! (item === event.target.closest('div.date-cards').children[1])){
        item.style.display = 'none';
      }
    }
    if (!event.target.closest('div.buyer-div')){
      // popup
      const element = event.target.closest('div.date-cards').children[1];
      // toggle
      element.style.display = element.style.display === 'none' || !element.style.display ? 'block' : 'none';
    }
  }
}
