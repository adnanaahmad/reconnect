import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';

@Component({
  selector: 'app-registration-buyer',
  templateUrl: './registration-buyer.component.html',
  styleUrls: ['./registration-buyer.component.scss']
})
export class RegistrationBuyerComponent implements OnInit {

  screen = {one: true, two: false, three: false, four: false, five: false};
  professional: any;
  constructor(private router: Router) { }

  ngOnInit(): void {
    this.professional = [
      {image: 'https://img-cdn.tid.al/o/4858a4b2723b7d0c7d05584ff57701f7b0c54ce3.jpg', name: 'Daniel Kevin', role: 'Real Estate Agent', number: '+923 24 4 1276'},
      {image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRHPzYd8Zq8A3IXMaeSeTyfaSTce2CLi0NZ-Q&usqp=CAU', name: 'Tom Holland', role: 'Attorney', number: '+923 24 4 1276'},
      {image: 'https://alicepropertymanagement.com/images/temp-profile.jpg', name: 'Sean Paul', role: 'Lender', number: '+923 24 4 1276'},
    ];
  }
  selectProfessional(): void{

  }
}
