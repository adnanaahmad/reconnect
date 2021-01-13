import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-registration-partner',
  templateUrl: './registration-partner.component.html',
  styleUrls: ['./registration-partner.component.scss']
})
export class RegistrationPartnerComponent implements OnInit {
  screen: any;
  constructor() { }

  ngOnInit(): void {
    this.screen = {one: true, two: false, three: false};
  }

}
