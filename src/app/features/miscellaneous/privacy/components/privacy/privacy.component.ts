import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-privacy',
  templateUrl: './privacy.component.html',
  styleUrls: ['./privacy.component.scss']
})
export class PrivacyComponent implements OnInit {
  privacy: Array<any>;
  constructor() { }

  ngOnInit(): void {
    this.privacy = [
      {
        name: 'Interpretation And Definitions',
        path: '/privacy/interpretation'
      },
      {
        name: 'Collecting And Using Your Personal Data',
        path: '/privacy/usingPersonalData'
      },
      {
        name: 'Detailed Information On The Processing Of Your Personal Data',
        path: '/privacy/processingPersonalData'
      },
      {
        name: 'Ccpa Privacy',
        path: '/privacy/ccpa'
      },
      {
        name: '"Do Not Track" Policy',
        path: '/privacy/privacyProtectionAct'
      },
      {
        name: 'Children\'s Privacy',
        path: '/privacy/children'
      },
      {
        name: 'Your California Privacy Rights',
        path: '/privacy/californiaRights'
      },
      {
        name: 'California Privacy Rights For Minor Users',
        path: '/privacy/minorUsers'
      },
      {
        name: 'Links To Other Websites',
        path: '/privacy/links'
      },
      {
        name: 'Changes To These privacy And Conditions',
        path: '/privacy/policy'
      },
      {
        name: 'Contact Us',
        path: '/privacy/contactUs'
      },
    ];
  }

}
