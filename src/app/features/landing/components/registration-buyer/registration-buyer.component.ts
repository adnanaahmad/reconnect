import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {FormBuilder, Validators} from '@angular/forms';
import {RegistrationBuyerModel} from '../../models/registration-buyer.model';

@Component({
  selector: 'app-registration-buyer',
  templateUrl: './registration-buyer.component.html',
  styleUrls: ['./registration-buyer.component.scss']
})
export class RegistrationBuyerComponent implements OnInit {
  registration: RegistrationBuyerModel = {} as RegistrationBuyerModel;
  constructor(private router: Router, private fb: FormBuilder) { }

  ngOnInit(): void {
    this.registration.screen = {one: true, two: false, three: false};
    this.registration.referral = false;
    this.registration.aboutUs = [
        'Professional or Friend Reference',
        'Facebook Advertisement',
        'Twitter',
        'Youtube Videos(Channel)',
        'Website',
        'Other'
    ];
    this.registration.form = this.fb.group({
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
    // this.registration.form.valueChanges.subscribe(res => {
    //   console.log(res);
    // });
  }
  showReferral(): void{
    // api call
    this.registration.referral = this.registration.form.get('aboutUs').value === 'Professional or Friend Reference';
    if (this.registration.referral){
      this.registration.form.get('referralName').enable();
      this.registration.form.get('referral').enable();

      this.registration.professional = [
        {image: 'https://img-cdn.tid.al/o/4858a4b2723b7d0c7d05584ff57701f7b0c54ce3.jpg', name: 'Daniel Kevin', role: 'Real Estate Agent', number: '+923 24 4 1276'},
        {image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRHPzYd8Zq8A3IXMaeSeTyfaSTce2CLi0NZ-Q&usqp=CAU', name: 'Tom Holland', role: 'Attorney', number: '+923 24 4 1276'},
        {image: 'https://alicepropertymanagement.com/images/temp-profile.jpg', name: 'Sean Paul', role: 'Lender', number: '+923 24 4 1276'},
      ];
    } else{
      this.registration.form.get('referralName').disable();
      this.registration.form.get('referral').disable();
    }
  }
  onSubmit(): void{
    console.log(this.registration.form.value);
  }
}
