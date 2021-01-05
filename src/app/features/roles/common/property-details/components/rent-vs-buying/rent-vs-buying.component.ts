import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-rent-vs-buying',
  templateUrl: './rent-vs-buying.component.html',
  styleUrls: ['./rent-vs-buying.component.scss']
})
export class RentVsBuyingComponent implements OnInit {
  @Input() rentVsBuying;
  constructor() { }

  ngOnInit(): void {
  }

}
