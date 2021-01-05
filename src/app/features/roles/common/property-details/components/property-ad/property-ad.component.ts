import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-property-ad',
  templateUrl: './property-ad.component.html',
  styleUrls: ['./property-ad.component.scss']
})
export class PropertyAdComponent implements OnInit {
  @Input() propertyAd;
  constructor() { }

  ngOnInit(): void {
    this.propertyAd.image = this.propertyAd.album[0];
  }
  changeImage(value): void{
    this.propertyAd.image = value;
  }
}
