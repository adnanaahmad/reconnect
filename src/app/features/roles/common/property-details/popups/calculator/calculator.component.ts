import {Component, Input, OnInit} from '@angular/core';
import {HelperService} from '../../../../../../core/helper/helper.service';
import {ConstantService} from '../../../../../../core/constant/constant.service';
import {StoreService} from '../../../../../../core/store/store.service';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-calculator',
  templateUrl: './calculator.component.html',
  styleUrls: ['./calculator.component.scss']
})
export class CalculatorComponent implements OnInit {
  @Input() calculator: any;
  @Input() scenarioNumber: any;
  constructor(private helper: HelperService,
              public constant: ConstantService,
              public store: StoreService,
              public activeModal: NgbActiveModal,) { }

  ngOnInit(): void {
    this.helper.setModalPosition();
    console.log(this.calculator);
  }
  close(): void{
    this.activeModal.close({status: 'no'});
  }
}
