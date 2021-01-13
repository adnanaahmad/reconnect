import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {FormBuilder, Validators} from '@angular/forms';

@Component({
  selector: 'app-registration-buyer',
  templateUrl: './registration-buyer.component.html',
  styleUrls: ['./registration-buyer.component.scss']
})
export class RegistrationBuyerComponent implements OnInit {

  screen = {one: true, two: false, three: false};
  professional: any;
  aboutUs: any;
  aboutUsModel: any;
  referral: any;
  registrationForm: any;
  constructor(private router: Router, private fb: FormBuilder) { }

  ngOnInit(): void {
    this.referral = false;
    this.aboutUs = [
        'Professional or Friend Reference',
        'Facebook Advertisement',
        'Twitter',
        'Youtube Videos(Channel)',
        'Website',
        'Other'
    ];
    this.registrationForm = this.fb.group({
      firstName: [null, Validators.required],
      lastName: [null, Validators.required],
      email: [null, Validators.required],
      password: [null, Validators.required],
      confirmPassword: [null, Validators.required],
      aboutUs: [null, Validators.required],
      agreed: [null, Validators.required],
      referralName: [{value: null, disabled: true}, Validators.required],
      referral: [{value: null, disabled: true}, Validators.required],
    });
    this.registrationForm.valueChanges.subscribe(res => {
      console.log(res);
    });
  }
  showReferral(): void{
    // api call
    this.referral = this.registrationForm.get('aboutUs').value === 'Professional or Friend Reference';
    if (this.referral){
      this.registrationForm.get('referralName').enable();
      this.registrationForm.get('referral').enable();

      this.professional = [
        {image: 'https://img-cdn.tid.al/o/4858a4b2723b7d0c7d05584ff57701f7b0c54ce3.jpg', name: 'Daniel Kevin', role: 'Real Estate Agent', number: '+923 24 4 1276'},
        {image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRHPzYd8Zq8A3IXMaeSeTyfaSTce2CLi0NZ-Q&usqp=CAU', name: 'Tom Holland', role: 'Attorney', number: '+923 24 4 1276'},
        {image: 'https://alicepropertymanagement.com/images/temp-profile.jpg', name: 'Sean Paul', role: 'Lender', number: '+923 24 4 1276'},
      ];
    } else{
      this.registrationForm.get('referralName').disable();
      this.registrationForm.get('referral').disable();
    }
  }
  onSubmit(): void{
    console.log(this.registrationForm.value);
  }
}
