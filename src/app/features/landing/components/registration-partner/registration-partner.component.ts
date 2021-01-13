import { Component, OnInit } from '@angular/core';
import {LocationService} from '../../services/location/location.service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {RegistrationPartnerModel} from '../../models/registration-partner.model';

@Component({
  selector: 'app-registration-partner',
  templateUrl: './registration-partner.component.html',
  styleUrls: ['./registration-partner.component.scss']
})
export class RegistrationPartnerComponent implements OnInit {
  register: RegistrationPartnerModel = {} as RegistrationPartnerModel;
  constructor(private location: LocationService, private fb: FormBuilder) { }

  ngOnInit(): void {
    this.register.screen = {one: true, two: false, three: false};
    this.register.role = ['Agent', 'Attorney', 'Real Estate', 'Lender', 'Home Inspector', 'Insurance Agent'];
    this.location.authToken().subscribe(res => {
      this.register.token = res.auth_token;
      this.location.getStates(this.register.token).subscribe(res1 => {
        this.register.states = res1;
      });
    });
    this.register.form = this.fb.group({
      company: this.fb.group({
        companyName: [null, Validators.required],
        license: [null, Validators.required],
        phoneNumber: [null, Validators.required],
        city: [null, Validators.required],
        street: [null, Validators.required],
        state: [null, Validators.required],
        zipCode: [null, Validators.required],
      }),
      personal: this.fb.group({
        role: [null, Validators.required],
        firstName: [null, Validators.required],
        lastName: [null, Validators.required],
        nmls: [null, Validators.required],
        phoneNumber: [null, Validators.required],
        email: [null, Validators.required],
        // password: [null, Validators.required],
        // confirmPassword: [null, Validators.required],
      }),
      agreed: [null, Validators.required]
    });
    this.register.form.valueChanges.subscribe(x => console.log(x));
  }

  changeState(state): void{
    this.location.getCities(state, this.register.token).subscribe(res => {
      this.register.cities = res;
    });
  }
  onSubmit(): void{
    console.log(this.register.form.value);
  }
}
