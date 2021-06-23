import {Component, EventEmitter, Input, OnChanges, OnInit, Output} from '@angular/core';
import {TemplateModel} from '../../models/pre-approval-template.model';
import {FormArray, FormBuilder, FormGroup, Validators} from '@angular/forms';
import {PreApprovalLetterService} from '../../services/pre-approval-letter.service';
import {HelperService} from '../../../../../../core/helper/helper.service';
import {ToastrService} from 'ngx-toastr';
import {take} from 'rxjs/operators';
import {StoreService} from '../../../../../../core/store/store.service';

@Component({
  selector: 'app-template',
  templateUrl: './template.component.html',
  styleUrls: ['./template.component.scss']
})
export class TemplateComponent implements OnInit, OnChanges {
  @Input() data: TemplateModel;
  @Input() justTemplate: boolean;
  @Input() otherDetails: any;
  @Input() loanType: string;
  @Output() update =  new EventEmitter<any>();
  template: FormGroup;
  showJustTemplate: boolean;
  rent: number;
  constructor(private fb: FormBuilder,
              private preApprovalService: PreApprovalLetterService,
              public helper: HelperService,
              private toaster: ToastrService,
              private store: StoreService) {}

  ngOnInit(): void {}
  ngOnChanges(): void {
    this.showJustTemplate = this.justTemplate;
    this.template = this.fb.group({
      body: [this.data.body, Validators.required],
      conditions: new FormArray([]),
      closing: [this.data.closing, Validators.required],
      title: [this.data.title],
      description: [this.data.description]
    });
    if (this.data.conditions ? this.data.conditions.length > 0 : false){
      this.data.conditions.forEach(x => {
        this.conditions.push(this.fb.control(x));
      });
    }
  }
  get calculateRent(): number{
    this.rent = 0;
    Object.keys(this.otherDetails.listings[0].defaultMarketRent).forEach((x , index) => {
      if (index <= (this.otherDetails.listings[0].xf_no_units - 1)){
        this.rent = this.rent + this.otherDetails.listings[0].defaultMarketRent[x];
      }
    });
    return this.rent;
  }
  addConditions(): void {
    this.conditions.push(this.fb.control(null));
  }
  deleteCondition(index): void{
    const conditions = this.template.get('conditions') as FormArray;
    conditions.removeAt(index);
  }
  get conditions(): FormArray {
    return this.template.get('conditions') as FormArray;
  }
  onSubmit(): void{
    this.preApprovalService.updateTemplate(this.template.value, this.data._id).pipe(take(1)).subscribe(res => {
      this.toaster.success('Template saved successfully');
      this.update.emit(res.result);
    }, error => {
      this.helper.handleApiError(error, 'Failed to update template');
    });
  }
  sendLetter(): void{
    const data = {
      loanType: this.loanType,
      borrowerId: this.otherDetails.buyerDetails._id,
      loanId: this.otherDetails.userLoan._id,
      licensedLenderAndBroker: {
        preApprovalDate: this.otherDetails.userLoan.preApprovalDate,
        expirationDate: this.otherDetails.userLoan.lockExpiryDate ? this.otherDetails.userLoan.lockExpiryDate : 'N.A',
        borrowerName: this.otherDetails.buyerDetails.firstName + ' ' + this.otherDetails.buyerDetails.lastName,
        CoBorrowerName: this.otherDetails.userLoan.coBorrowerName ? this.otherDetails.userLoan.coBorrowerName : 'N.A'
      },
      preApprovalTerms: {
        purchasePrice: this.otherDetails.listings[0].listPrice,
        downPayment: this.otherDetails.listings[0].financing[this.loanType].downPaymentCalculated,
        sellerCredit: this.otherDetails.userLoan.sellerCredit,
        propertyTaxes: this.otherDetails.listings[0].xf_taxes || this.otherDetails.listings[0].xf_taxes === 0 ? this.otherDetails.listings[0].xf_taxes : 'N.A',
        loanAmount: this.otherDetails.listings[0].financing[this.loanType].loanAmount,
        loanType: this.helper.formatRole(this.loanType),
        propertyType: this.otherDetails.listings[0].propertyType,
      },
      body: this.template.get('body').value,
      conditions: this.template.get('conditions').value,
      closing: this.template.get('closing').value,
      lenderDetails: this.store.getUserData(),
      mlsId: this.otherDetails.listings[0].id
    };
    if (this.otherDetails.listings[0].propertyType === 'Multi-family'){
      data['preApprovalTerms']['requiredRentalIncome'] = this.calculateRent;
    }
    this.preApprovalService.generateLetter(data).pipe(take(1)).subscribe(res => {
      this.toaster.success('Letter sent successfully');
    }, error => {
      this.helper.handleApiError(error, 'Failed to generate letter');
    });
  }
}
