import {AfterViewInit, Component, ElementRef, Input, OnInit, QueryList, ViewChildren} from '@angular/core';

@Component({
  selector: 'app-features',
  templateUrl: './features.component.html',
  styleUrls: ['./features.component.scss']
})
export class FeaturesComponent implements OnInit {
  @Input() propertyDetails;
  limit: number;
  constructor() { }

  ngOnInit(): void {
    this.limit = 3;
  }
  toggle(event): void{
    const parent = (event.target as HTMLElement).closest('div.feature-parent');
    parent.childNodes.forEach(element => {
      if ( (element as HTMLElement).classList ? (element as HTMLElement).classList.contains('show') : false){
        if ( (element as HTMLElement).classList.contains('hide') ) {
          (element as HTMLElement).classList.remove('hide');
          event.target.innerHTML = 'Show less';
        } else {
          (element as HTMLElement).classList.add('hide');
          event.target.innerHTML = 'Show more';
        }
      }
    });
  }
  get length(): number{
    return Object.keys(this.propertyDetails).length;
  }
  get halfLength(): number {
    const half = Object.keys(this.propertyDetails).length;
    return half % 2 === 0 ?  half / 2 : Math.floor(half / 2);
  }
  get otherHalfLength(): number{
    const half = Object.keys(this.propertyDetails).length;
    return half % 2 === 0 ?  half / 2 : Math.floor(half / 2);
  }

}
