import {Component, Input, OnInit, Output, EventEmitter, OnChanges, SimpleChanges} from '@angular/core';
import {HomeDetails, HomeModel} from '../../../features/roles/buyer/favorites/models/favorites.model';
import {SearchHomeService} from '../../../features/roles/common/search-homes/services/search-home.service';
import {ToastrService} from 'ngx-toastr';
import {Router} from '@angular/router';
import {take} from 'rxjs/operators';
import {HelperService} from '../../../core/helper/helper.service';
import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';
import {DatePipe, TitleCasePipe} from '@angular/common';
pdfMake.vfs = pdfFonts.pdfMake.vfs;
@Component({
  selector: 'app-home-card-1',
  templateUrl: './home-card.component.html',
  styleUrls: ['./home-card.component.scss'],
  providers: [TitleCasePipe, DatePipe]
})
export class HomeCardComponent implements OnInit {
  @Input() letter: any;
  @Input() homeDetails: HomeDetails = {} as HomeDetails;
  @Output() removeFavorite = new EventEmitter<any>();
  constructor(private searchHomeService: SearchHomeService,
              private toaster: ToastrService,
              private router: Router,
              private helper: HelperService,
              private titleCase: TitleCasePipe,
              private datePipe: DatePipe) { }

  ngOnInit(): void {
  }

  removeFromFavorites(): void{
    this.searchHomeService.removeFavorite(this.homeDetails.details.id).pipe(take(1)).subscribe(res => {
      console.log(res);
      this.toaster.success('Removed From Favorites');
      this.removeFavorite.emit(res.result);
    }, error => {
      this.toaster.error('Failed To Remove From Favorites');
    });
  }
  propertyDetails(): void{
    this.router.navigateByUrl(`/home/propertyDetails/${this.homeDetails.details.id}`).then();
  }
  async generatePDF() {
    const data = {
      content: [
        {
          image: await this.helper.getBase64ImageFromURL(this.letter.lenderDetails.company.companyLogoUrl ? this.letter.lenderDetails.company.companyLogoUrl : 'https://static.wikia.nocookie.net/nopixel/images/b/b4/Not-found-image-15383864787lu.jpg/revision/latest?cb=20200910062142'),
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
                  this.datePipe.transform(this.letter.licensedLenderAndBroker.preApprovalDate, 'yyyy-MM-dd'),
                  this.letter.licensedLenderAndBroker.expirationDate ?
                      this.datePipe.transform(this.letter.licensedLenderAndBroker.expirationDate, 'yyyy-MM-dd') : 'N.A',
                ]
              ]
            },
            {
              columns: [
                ['Borrower Name:', 'Co-Borrower Name:'],
                [
                  this.titleCase.transform(this.letter.licensedLenderAndBroker.borrowerName),
                  this.letter.licensedLenderAndBroker.coBorrowerName ?
                      this.titleCase.transform(this.letter.licensedLenderAndBroker.coBorrowerName) : 'N.A'
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
                  '$' + this.letter.preApprovalTerms.purchasePrice,
                  '$' + this.letter.preApprovalTerms.downPayment,
                  '$' + this.letter.preApprovalTerms.sellerCredit,
                  '$' + this.letter.preApprovalTerms.propertyTaxes ||
                  this.letter.preApprovalTerms.propertyTaxes === 0 ? ('$' + this.letter.preApprovalTerms.propertyTaxes) : 'N.A'
                ]
              ]
            },
            {
              columns: [
                ['Loan Amount:', 'Loan Type:', 'Property Type:', 'Rental Income:'],
                [
                  '$' + this.letter.preApprovalTerms.loanAmount,
                  this.titleCase.transform(this.helper.formatRole(this.letter.preApprovalTerms.loanType)),
                  this.letter.preApprovalTerms.propertyType,
                  (this.letter.preApprovalTerms.rentalIncome) ? ('$' + this.letter.preApprovalTerms.rentalIncome) : 'N.A'
                ],
              ]
            }
          ],
          style: 'mb-2'
        },
        {
          text: this.letter.body,
          style: 'mb-2'
        },
        {
          text: 'STANDARD APPROVAL CONDITIONS:',
          style: 'ml-1'
        },
        {
          ol: this.letter.conditions,
          margin: [40, 0, 0, 10]
        },
        {
          text: this.letter.closing,
          style: 'mb-1'
        },
        {
          text: 'Respectfully,',
        },
        {
          text: this.titleCase.transform(this.letter.lenderDetails.firstName +
              ' ' + this.letter.lenderDetails.lastName),
          style: 'signature'
        },
        {
          image: await this.helper.getBase64ImageFromURL(this.letter.lenderDetails.profilePictureUrl),
          width: 120,
          height: 100,
          style: 'mb-1'
        },
        this.titleCase.transform(this.letter.lenderDetails.firstName +
            ' ' + this.letter.lenderDetails.lastName),
        this.titleCase.transform(this.letter.lenderDetails.company.name),
        {
          text: `${this.letter.lenderDetails.company.street} ${this.letter.lenderDetails.company.city}, ${this.letter.lenderDetails.company.state}, ${this.letter.lenderDetails.company.zip} PHONE: ${this.letter.lenderDetails.company.phoneNumber} FAX: ${this.letter.lenderDetails.company.faxNumber}`,
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
      pdfMake.createPdf(data).open();
    } catch (err) {
      alert(err);
    }
  }
}
