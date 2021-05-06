import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-terms',
  templateUrl: './terms.component.html',
  styleUrls: ['./terms.component.scss']
})
export class TermsComponent implements OnInit {
  terms: Array<any> ;

  constructor() { }

  ngOnInit(): void {
    this.terms = [
      {
        name: 'Interpretation And Definitions',
        path: '/terms/interpretation'
      },
      {
        name: 'Acknowledgement',
        path: '/terms/acknowledgement'
      },
      {
        name: 'User Accounts',
        path: '/terms/userAccounts'
      },
      {
        name: 'Content',
        path: '/terms/content'
      },
      {
        name: 'Content Restrictions',
        path: '/terms/contentRestrictions'
      },
      {
        name: 'Copyright Policy',
        path: '/terms/copyrightPolicy'
      },
      {
        name: 'Intellectual Property',
        path: '/terms/intellectualProperty'
      },
      {
        name: 'Your Feedback To Us',
        path: '/terms/feedback'
      },
      {
        name: 'Links To Other Websites',
        path: '/terms/links'
      },
      {
        name: 'Termination',
        path: '/terms/termination'
      },
      {
        name: 'Limitation Of Liability',
        path: '/terms/liability'
      },
      {
        name: '"As Is" And "As Available" Disclaimer',
        path: '/terms/disclaimer'
      },
      {
        name: 'Governing Law',
        path: '/terms/governingLaw'
      },
      {
        name: 'Disputes Resolution',
        path: '/terms/disputesResolution'
      },
      {
        name: 'For European Union (Eu) Users',
        path: '/terms/eu'
      },
      {
        name: 'United States Legal Compliance',
        path: '/terms/legalCompliance'
      },
      {
        name: 'Severability And Waiver',
        path: '/terms/waiver'
      },
      {
        name: 'Translation Interpretation',
        path: '/terms/translation'
      },
      {
        name: 'Changes To These Terms And Conditions',
        path: '/terms/termsAndConditions'
      },
      {
        name: 'Contact Us',
        path: '/terms/contactUs'
      },
    ];
  }

}
