import {ChangeDetectorRef, Component, Input, OnInit} from '@angular/core';
import { BuyerModel } from '../../models/referral-lineage.model';

@Component({
  selector: 'app-node',
  templateUrl: './node.component.html',
  styleUrls: ['./node.component.scss']
})
export class NodeComponent {
  @Input() public item: BuyerModel;
  @Input() public zoom: number

  constructor(private changeDetector: ChangeDetectorRef) {
    this.item = {} as BuyerModel;
  }
}
