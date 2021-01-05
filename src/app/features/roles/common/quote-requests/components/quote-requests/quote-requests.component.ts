import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {QuoteRequestsModel} from '../../models/quote-requests.model';

@Component({
  selector: 'app-quote-requests',
  templateUrl: './quote-requests.component.html',
  styleUrls: ['./quote-requests.component.scss'],
  encapsulation: ViewEncapsulation.Emulated
})
export class QuoteRequestsComponent implements OnInit {
  quoteRequests: QuoteRequestsModel = {} as QuoteRequestsModel;
  constructor() { }

  ngOnInit(): void {
    this.quoteRequests.buttons = ['Pending', 'Accepted', 'Rejected'];
    this.quoteRequests.selectedButton = this.quoteRequests.buttons[0];
    this.quoteRequests.quoteRequests = [
      {
        subjectProperty: {
          image: 'https://images.unsplash.com/photo-1591474200742-8e512e6f98f8?ixlib=rb-1.2.1&ixid=MXwxMjA3fDB8MHxleHBsb3JlLWZlZWR8Nnx8fGVufDB8fHw%3D&w=1000&q=80',
          bathrooms: 2,
          bedrooms: 2,
          garage: 4,
          sqFt: 1594,
          status: 'Active',
          propertyType: '2 Units Up/Down',
          lotSize: 4898,
          timeOnMarket: '8 Days',
          community: 'Worcester',
          mls: 726168,
        },
        buyer: {
          name: 'James Hetfield',
          image: 'https://cdn.luxe.digital/media/2019/09/12090502/business-professional-dress-code-men-style-luxe-digital.jpg',
          socialMedia: {
            facebook: 'https://www.google.com/',
            instagram: 'https://www.google.com/',
            twitter: 'https://www.google.com/'
          }
        }
      },
    ];
  }

  listClick(value): void{
    this.quoteRequests.selectedButton = value;
  }
}
