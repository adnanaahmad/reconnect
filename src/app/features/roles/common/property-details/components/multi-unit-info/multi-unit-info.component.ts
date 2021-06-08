import {Component, Input, OnInit} from '@angular/core';
import {ConstantService} from '../../../../../../core/constant/constant.service';
import {HelperService} from '../../../../../../core/helper/helper.service';

@Component({
  selector: 'app-multi-unit-info',
  templateUrl: './multi-unit-info.component.html',
  styleUrls: ['./multi-unit-info.component.scss']
})
export class MultiUnitInfoComponent implements OnInit {
  @Input() data: any;
  noOfUnit: Array<number>;
  constructor(public constant: ConstantService,
              public helper: HelperService) { }

  ngOnInit(): void {
    const limit = Number(this.data.xf_no_units) > 4 ? 4 : Number(this.data.xf_no_units);
    this.noOfUnit =  Array.from({length: limit}, () => 0);
  }
}
