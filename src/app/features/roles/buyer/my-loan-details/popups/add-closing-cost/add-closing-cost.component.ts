import {Component, Input, OnInit} from '@angular/core';
import {HelperService} from '../../../../../../core/helper/helper.service';
import {FormArray, FormBuilder, FormGroup, Validators} from '@angular/forms';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {ToastrService} from 'ngx-toastr';
import {take} from 'rxjs/operators';
import {LoanDetailsService} from '../../services/loan-details.service';

@Component({
  selector: 'app-add-closing-cost',
  templateUrl: './add-closing-cost.component.html',
  styleUrls: ['./add-closing-cost.component.scss']
})
export class AddClosingCostComponent implements OnInit {
  @Input() fixedExpenses: any;
  @Input() variableExpenses: any;
  closingCost: FormGroup;
  constructor(private helper: HelperService,
              private fb: FormBuilder,
              public activeModal: NgbActiveModal,
              private toaster: ToastrService,
              private loanDetailsService: LoanDetailsService) { }

  ngOnInit(): void {
    this.helper.setModalPosition();
    this.initializeForm();
    this.getClosingCost();
    // this.closingCost.valueChanges.subscribe(res => {
    //   console.log(res);
    // });
    //console.log(this.variableExpenses, this.fixedExpenses);
  }
  getClosingCost(): void{
    this.closingCost.patchValue({
      variableExpenses: this.variableExpenses,
    });
    if (this.fixedExpenses){
      const fixedExpenses = this.closingCost.get('fixedExpenses') as FormArray;
      Object.keys(this.fixedExpenses).forEach(x => {
        fixedExpenses.push(this.fb.group({
          name: [x, Validators.required],
          amount: [this.fixedExpenses[x].amount, Validators.required],
          type: [this.fixedExpenses[x].type, Validators.required]
        }));

      });
    }
  }
  initializeForm(): void{
    this.closingCost = this.fb.group({
      fixedExpenses: this.fb.array([]),
      variableExpenses: this.fb.group({
        homeownersInsurance: this.fb.group({
          oneFamily: [null, Validators.required],
          twoFamily: [null, Validators.required],
          threeFamily: [null, Validators.required],
          fourFamily: [null, Validators.required],
          condo: [null, Validators.required],
        }),
        escrowReserves: this.fb.group({
          hazardInsurance: [null, Validators.required],
          tax: [null, Validators.required],
        }),
        titleInsurance: this.fb.group({
          lender: [null, Validators.required],
          owner: [null, Validators.required],
        }),
        appraisalAmount: this.fb.group({
          oneFamily: [null, Validators.required],
          twoFamily: [null, Validators.required],
        }),
        originationChargePoint: [null, Validators.required], // value in percentage
        dailyInterestDays: [null, Validators.required],
      })
    });
  }
  addFixedExpense(): void {
    const fixedExpenses = this.closingCost.get('fixedExpenses') as FormArray;
    fixedExpenses.push(this.createFixedExpense());
  }
  createFixedExpense(): FormGroup {
    return this.fb.group({
      name: [null, Validators.required],
      amount: [null, Validators.required],
      type: [null, Validators.required]
    });
  }
  deleteFixedExpense(index): void{
    const fixedExpenses = this.closingCost.get('fixedExpenses') as FormArray;
    fixedExpenses.removeAt(index);
  }
  close(): void{
    this.activeModal.close({status: 'no'});
  }
  onSubmit(): void{
    if (this.closingCost.valid){
      this.loanDetailsService.setLoanDetails(this.closingCost.value).pipe(take(1)).subscribe(res => {
        console.log(res);
        this.toaster.success('Saved');
        this.activeModal.close({status: 'yes', data: res.result});
      }, error => {
        console.log(error);
        this.toaster.error('Failed To Save');
      });
    } else{
      this.toaster.error('Incomplete form');
    }
  }
}
