import {Component, Input, OnInit} from '@angular/core';
import {NgbModal, NgbModalConfig} from '@ng-bootstrap/ng-bootstrap';
import {SharePropertyComponent} from '../../popups/share-property/share-property.component';

@Component({
  selector: 'app-property-ad',
  templateUrl: './property-ad.component.html',
  styleUrls: ['./property-ad.component.scss']
})
export class PropertyAdComponent implements OnInit {
  @Input() propertyAd;
  constructor(private modalService: NgbModal, private config: NgbModalConfig) {
    config.container = 'app-property-details';
    config.centered = true;
  }

  ngOnInit(): void {
    this.propertyAd.image = this.propertyAd.album[0];
  }
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
