import {Component, Input, OnChanges, OnDestroy, OnInit, SimpleChanges} from '@angular/core';
import {PieChartComponent} from '../../popups/pie-chart/pie-chart.component';
import {NgbModal, NgbModalConfig} from '@ng-bootstrap/ng-bootstrap';
import {LoanScenarioModel, ViewPaymentBreakDownModel} from '../../models/property-details.model';
import {StoreService} from '../../../../../../core/store/store.service';
import {Subscription} from 'rxjs';
import {CalculatorComponent} from '../../popups/calculator/calculator.component';
import {FormControl} from '@angular/forms';
import {debounceTime, distinctUntilChanged, take} from 'rxjs/operators';
import {HelperService} from '../../../../../../core/helper/helper.service';
import {DatePipe, TitleCasePipe} from '@angular/common';
import {PropertyDetailsService} from '../../services/property-details.service';
import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';
pdfMake.vfs = pdfFonts.pdfMake.vfs;

@Component({
  selector: 'app-scenario',
  templateUrl: './scenario.component.html',
  styleUrls: ['./scenario.component.scss'],
  providers: [TitleCasePipe, DatePipe]
})
export class ScenarioComponent implements OnInit, OnChanges, OnDestroy {
  @Input() loanScenario;
  @Input() scenarioNumber;
  scenario: LoanScenarioModel = {} as LoanScenarioModel;
  pieChart: ViewPaymentBreakDownModel = {} as ViewPaymentBreakDownModel;
  subscription: Array<Subscription>;
  purchasePrice: FormControl;
  qualify: boolean;
  constructor(private modalService: NgbModal,
              configuration: NgbModalConfig,
              public store: StoreService,
              private helper: HelperService,
              private titleCase: TitleCasePipe,
              private datePipe: DatePipe,
              private listingService: PropertyDetailsService) {
    configuration.centered = true;
    configuration.container =  'app-property-details';
    this.subscription = [];
  }

  ngOnInit(): void {
    this.purchasePrice = new FormControl(Math.round(this.loanScenario.listings[0].listPrice));
    this.subscription.push(
        this.purchasePrice.valueChanges.pipe(debounceTime(300), distinctUntilChanged()).subscribe(res => {
            console.log(res);
            this.store.updatePurchasePrice(res);
        }));
  }
  ngOnChanges(changes: SimpleChanges): void {
    this.subscription.push(
        this.store.toggleLoanType.subscribe(loanType => {
          this.loanScenario.loanType = loanType;
          this.loanScenario.template = this.loanScenario.userLoan.preapprovalTemplates[loanType];
          this.loanScenario.rent = this.calculateRent;
          this.scenario.housingRatio = Number(this.loanScenario.listings[0].financing[loanType].housingRatio ?
              this.loanScenario.listings[0].financing[loanType].housingRatio.toFixed(2) : null);
          this.scenario.debtRatio = Number(this.loanScenario.listings[0].financing[loanType].debtRatio ?
              this.loanScenario.listings[0].financing[loanType].debtRatio.toFixed(2) : null);
          this.scenario.purchasePrice = Math.round(this.loanScenario.listings[0].listPrice);
          this.scenario.loanAmount = Math.round(this.loanScenario.listings[0].financing[loanType].loanAmount);
          this.scenario.financeAmount = Math.round(this.loanScenario.listings[0].financing[loanType].financeAmount);
          this.scenario.downPayment = Math.round(this.loanScenario.listings[0].financing[loanType].downPaymentCalculated);
          this.scenario.loanRate = (this.loanScenario.userLoan[loanType].loanRate);
          this.scenario.loanTerm = Math.round(this.loanScenario.userLoan[loanType].loanTerm);
          this.scenario.monthlyPayment = Math.round(this.loanScenario.listings[0].financing[loanType].totalPayment);
          this.scenario.fundsNeeded = this.scenarioNumber === 1 ?
              Math.round(this.loanScenario.listings[0].financing[loanType].fundsNeeded) :
              Math.round(this.loanScenario.listings[0].financing[loanType].LS2_fundsNeeded);
          this.pieChart.principalAndInterest = Math.round(this.loanScenario.listings[0].financing[loanType].principalAndInterest);
          this.pieChart.insurance = Math.round(this.loanScenario.listings[0].financing[loanType].insurance);
          this.pieChart.taxes = Math.round(this.loanScenario.listings[0].financing[loanType].taxes);
          this.pieChart.mortgageInsurance = Math.round(this.loanScenario.listings[0].financing[loanType].mortgageInsurance);
          this.pieChart.hoa = Math.round(this.loanScenario.listings[0].hoa);
          this.pieChart.totalPayment = Math.round(this.loanScenario.listings[0].financing[loanType].totalPayment);

          this.qualify = !((this.loanScenario.listings[0].financing[loanType].housingRatio >
              this.loanScenario.userLoan[loanType].housingRatio || this.loanScenario.listings[0].financing[loanType].debtRatio >
              this.loanScenario.userLoan[loanType].debtRatio) ||
              ((this.scenarioNumber === 1 ? this.loanScenario.listings[0].financing[loanType].fundsNeeded :
                  this.loanScenario.listings[0].financing[loanType].LS2_fundsNeeded) < 0));
    }));
  }
  ngOnDestroy(): void {
    this.subscription.forEach(s => s.unsubscribe());
  }

  viewPieChart(): void {
    const modalRef = this.modalService.open(PieChartComponent);
    modalRef.componentInstance.breakDown = this.pieChart;
    modalRef.result.then((result) => {
      if (result !== 'Close click') {
        console.log(result);
      }
    }, error => {
      console.log(error);
    });
  }
  viewCalculator(): void {
    const modalRef = this.modalService.open(CalculatorComponent);
    modalRef.componentInstance.calculator = this.loanScenario;
    modalRef.componentInstance.scenarioNumber = this.scenarioNumber;
    modalRef.result.then((result) => {
      if (result !== 'Close click') {
        console.log(result);
      }
    }, error => {
      console.log(error);
    });
  }
  get calculateRent(): number{
     let rent = 0;
     for (let i = 0; i < this.loanScenario.listings[0].xf_no_units; i++) {
        rent = rent + this.loanScenario.listings[0]['xf_rent' + (i + 1)];
     }
     return rent;
  }

  generateLetter(): void {
      const data = {
          loanType: this.loanScenario.loanType,
          lenderId: this.loanScenario.team.lender.userId._id,
          loanId: this.loanScenario.userLoan._id,
          licensedLenderAndBroker: {
              preApprovalDate : this.loanScenario.userLoan.preApprovalDate,
              expirationDate : this.loanScenario.userLoan.lockExpiryDate ? this.loanScenario.userLoan.lockExpiryDate : null,
              borrowerName: this.loanScenario.buyerDetails.firstName + ' ' + this.loanScenario.buyerDetails.lastName,
              coBorrowerName: this.loanScenario.userLoan.coBorrowerName ? this.loanScenario.userLoan.coBorrowerName : null,
          },
          preApprovalTerms: {
              purchasePrice: this.scenario.purchasePrice,
              downPayment: this.scenario.downPayment,
              sellerCredit: this.loanScenario.userLoan.sellerCredit,
              propertyTaxes: this.loanScenario.listings[0].xf_taxes ||
              this.loanScenario.listings[0].xf_taxes === 0 ? (this.loanScenario.listings[0].xf_taxes) : null,
              loanAmount: this.scenario.loanAmount,
              loanType: this.loanScenario.loanType,
              propertyType: this.loanScenario.listings[0].propertyType,
              rentalIncome: (this.loanScenario.listings[0].propertyType === 'Multi-family') ? (this.loanScenario.rent) : null
          },
          body:  this.loanScenario.template.body,
          conditions:  this.loanScenario.template.conditions,
          closing:  this.loanScenario.template.closing,
          lenderDetails: this.loanScenario.team.lender.userId,
          mlsId: this.loanScenario.listings[0].id,
          listingDetails: {
              id: this.loanScenario.listings[0].id,
              listPrice: this.loanScenario.listings[0].listPrice,
              address: this.loanScenario.listings[0].address,
              listingOffice: {name: this.loanScenario.listings[0].listingOffice.name},
              listingAgent: {name: this.loanScenario.listings[0].listingAgent.name},
              xf_square_feet: this.loanScenario.listings[0].xf_square_feet ? this.loanScenario.listings[0].xf_square_feet : null,
              xf_no_bedrooms: this.loanScenario.listings[0].xf_no_bedrooms,
              xf_no_half_baths: this.loanScenario.listings[0].xf_no_half_baths,
              xf_no_full_baths: this.loanScenario.listings[0].xf_no_full_baths,
              xf_garage_spaces: this.loanScenario.listings[0].xf_garage_spaces ? this.loanScenario.listings[0].xf_garage_spaces : null,
              images: this.loanScenario.listings[0].images,
              description: this.loanScenario.listings[0].description
          }
      };
      // console.log(data);
      this.listingService.generateLetter(data).pipe(take(1)).subscribe(res => {
          console.log(res);
      }, error => {
         this.helper.handleApiError(error, 'Failed to save letter');
      });
  }
  async generatePDF() {
      const data = {
          content: [
              {
                  image: await this.helper.getBase64ImageFromURL(this.loanScenario.team.lender.userId.company.companyLogoUrl ? this.loanScenario.team.lender.userId.company.companyLogoUrl : 'https://static.wikia.nocookie.net/nopixel/images/b/b4/Not-found-image-15383864787lu.jpg/revision/latest?cb=20200910062142'),
                  width: 120,
                  height: 100,
                  alignment: 'center',
                  style: 'mb-1'
              },
              {
                  text: ['LICENSED LENDER AND BROKER'],
                  alignment: 'center',
                  fontSize: 15,
                  bold: true,
                  style: 'mb-1'
              },
              {
                  alignment: 'justify',
                  columns: [
                      {
                          columns: [
                              ['Pre-Approval Date:', 'Expiration Date:'],
                              [
                                  this.datePipe.transform(this.loanScenario.userLoan.preApprovalDate, 'yyyy-MM-dd'),
                                  this.loanScenario.userLoan.lockExpiryDate ?
                                      this.datePipe.transform(this.loanScenario.userLoan.lockExpiryDate, 'yyyy-MM-dd') : 'N.A',
                              ]
                          ]
                      },
                      {
                          columns: [
                              ['Borrower Name:', 'Co-Borrower Name:'],
                              [
                                  this.titleCase.transform(this.loanScenario.buyerDetails.firstName +
                                      ' ' + this.loanScenario.buyerDetails.lastName),
                                  this.loanScenario.userLoan.coBorrowerName ?
                                      this.titleCase.transform(this.loanScenario.userLoan.coBorrowerName) : 'N.A'
                              ]
                          ]
                      }
                  ],
                  style: 'mb-1'
              },
              {
                  text: ['PRE-APPROVAL TERMS'],
                  alignment: 'center',
                  fontSize: 12,
                  bold: true,
                  style: 'mb-1'
              },
              {
                  alignment: 'justify',
                  columns: [
                      {
                          columns: [
                              ['Purchase Price:', 'Down Payment:', 'Seller Credit:', 'Property Taxes:'],
                              [
                                  '$' + this.scenario.purchasePrice,
                                  '$' + this.scenario.downPayment,
                                  '$' + this.loanScenario.userLoan.sellerCredit,
                                  '$' + this.loanScenario.listings[0].xf_taxes ||
                                  this.loanScenario.listings[0].xf_taxes === 0 ? ('$' + this.loanScenario.listings[0].xf_taxes) : 'N.A'
                              ]
                          ]
                      },
                      {
                          columns: [
                              ['Loan Amount:', 'Loan Type:', 'Property Type:', 'Rental Income:'],
                              [
                                  '$' + this.scenario.loanAmount,
                                  this.titleCase.transform(this.helper.formatRole(this.loanScenario.loanType)),
                                  this.loanScenario.listings[0].propertyType,
                                  (this.loanScenario.listings[0].propertyType === 'Multi-family') ? ('$' + this.loanScenario.rent) : 'N.A'
                              ],
                          ]
                      }
                  ],
                  style: 'mb-2'
              },
              {
                  text: this.loanScenario.template.body,
                  style: 'mb-2'
              },
              {
                  text: 'STANDARD APPROVAL CONDITIONS:',
                  style: 'ml-1'
              },
              {
                  ol: this.loanScenario.template.conditions,
                  margin: [40, 0, 0, 10]
              },
              {
                  text: this.loanScenario.template.closing,
                  style: 'mb-1'
              },
              {
                  text: 'Respectfully,',
              },
              {
                  text: this.titleCase.transform(this.loanScenario.team.lender.userId.firstName +
                      ' ' + this.loanScenario.team.lender.userId.lastName),
                  style: 'signature'
              },
              {
                  image: await this.helper.getBase64ImageFromURL(this.loanScenario.team.lender.userId.profilePictureUrl),
                  width: 120,
                  height: 100,
                  style: 'mb-1'
              },
              this.titleCase.transform(this.loanScenario.team.lender.userId.firstName +
                  ' ' + this.loanScenario.team.lender.userId.lastName),
              this.titleCase.transform(this.loanScenario.team.lender.userId.company.name),
              {
                  text: `${this.loanScenario.team.lender.userId.company.street} ${this.loanScenario.team.lender.userId.company.city}, ${this.loanScenario.team.lender.userId.company.state}, ${this.loanScenario.team.lender.userId.company.zip} PHONE: ${this.loanScenario.team.lender.userId.company.phoneNumber} FAX: ${this.loanScenario.team.lender.userId.company.faxNumber}`,
                  style: 'footer',
                  alignment: 'center',
              }
          ],
          styles: {
              header: {
                  fontSize: 18,
                  bold: true
              },
              bigger: {
                  fontSize: 15,
                  italics: true
              },
              'mb-1': {
                  margin: [0, 0, 0, 10],
              },
              'mb-2': {
                  margin: [0, 0, 0, 20],
              },
              'ml-1': {
                  margin: [40, 0, 0, 0]
              },
              footer: {
                  margin: [0, 15, 0, 0],
                  bold: true,
                  fontWeight: 800
              },
              signature: {
                  margin: [0, 0, 0, 10],
                  fontSize: 18,
              }
          },
          defaultStyle: {
              columnGap: 10,
              fontSize: 11,
          }

      };
      try {
          this.generateLetter();
          pdfMake.createPdf(data).open();
      } catch (err) {
          alert(err);
      }
  }
}
