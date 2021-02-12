import {Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {NgbModal, NgbModalConfig} from '@ng-bootstrap/ng-bootstrap';
import {SharePropertyComponent} from '../../popups/share-property/share-property.component';
import {PropertyAdModel} from '../../models/property-details.model';

@Component({
  selector: 'app-property-ad',
  templateUrl: './property-ad.component.html',
  styleUrls: ['./property-ad.component.scss']
})
export class PropertyAdComponent implements OnInit, OnChanges {
  @Input() propertyAd: PropertyAdModel = {} as PropertyAdModel;
  constructor(private modalService: NgbModal, private config: NgbModalConfig) {
    config.container = 'app-property-details';
    config.centered = true;
  }
  ngOnChanges(changes: SimpleChanges): void {
    this.propertyAd.image = this.propertyAd.images[0];
  }

  ngOnInit(): void {}
  changeImage(value): void{
    this.propertyAd.image = value;
  }
  shareProperty(): void{
    const modalRef = this.modalService.open(SharePropertyComponent);
    modalRef.result.then((result) => {
      if (result.status === 'yes') {
        console.log(result.data);
      }
    }, error => {
      //console.log(error);
    });
  }
}
