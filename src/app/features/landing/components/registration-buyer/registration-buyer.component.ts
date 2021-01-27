import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {AbstractControl, FormBuilder, FormControl, Validators} from '@angular/forms';
import {RegistrationBuyerModel} from '../../models/registration-buyer.model';
import {AuthService} from '../../services/auth/auth.service';
import {debounceTime, distinctUntilChanged, switchMap} from 'rxjs/operators';
import {HelperService} from '../../../../core/helper/helper.service';
import {ConstantService} from '../../../../core/constant/constant.service';
import {LocationService} from '../../services/location/location.service';

@Component({
  selector: 'app-registration-buyer',
  templateUrl: './registration-buyer.component.html',
  styleUrls: ['./registration-buyer.component.scss']
})
export class RegistrationBuyerComponent implements OnInit {
  registration: RegistrationBuyerModel = {} as RegistrationBuyerModel;
  constructor(private router: Router,
              private fb: FormBuilder,
              private auth: AuthService,
              public helper: HelperService,
              private constant: ConstantService,
              private location: LocationService) { }

  ngOnInit(): void {
    // this.registration.form.valueChanges.subscribe(res => {
    //   console.log(res);
    // });
    this.initialise();
    this.getReferralList();
  }
  initialise(): void{
    this.registration.screen = {one: true, two: false, three: false};
    this.registration.referral = false;
    this.registration.other = false;
    this.registration.aboutUs = this.constant.aboutUs;
    this.registration.form = this.fb.group({
      role: ['buyer'],
      firstName: [null, [Validators.required, Validators.pattern('([a-zA-Z]*)')]],
      lastName: [null, [Validators.required, Validators.pattern('([a-zA-Z]*)')]],
      email: [null, [Validators.required, Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')]],
      password: [null, [Validators.required, Validators.minLength(6)]],
      confirmPassword: [null, Validators.required],
      referral : this.fb.group({
        type: [null, Validators.required],
        details: [null, Validators.required],
      }),
    }, {validator: this.passwordConfirming});
    this.registration.agreed = new FormControl(false);
  }


  getReferralList(): void{
    this.auth.searchName.pipe(debounceTime(300), distinctUntilChanged()).subscribe( term => {
      if (term !== 1 && term.length > 2){
        this.auth.referenceList(term).subscribe(data => {
          this.registration.professional = data.result;
        });
      }
    });
  }
  search(name: string): void{
    this.auth.updateSearchName(name);
  }
  passwordConfirming(c: AbstractControl): { invalid: boolean } {
    if (c.get('password').value !== c.get('confirmPassword').value) {
      return {invalid: true};
    }
  }
  showReferral(event): void{
    this.registration.form.get(['referral', 'type']).setValue(this.registration.aboutUs[event]);
    this.registration.referral = event === 'Professional or Friend Reference';
    this.registration.other = event === 'Other';
    // this.registration.referral ? this.registration.form.get('referralName').enable() :
    //     this.registration.form.get('referralName').disable();
    this.registration.other || this.registration.referral ? this.registration.form.get(['referral', 'details']).enable() :
        this.registration.form.get(['referral', 'details']).disable();
  }
  onSubmit(): void{
    //console.log(this.registration.form.value);
    this.auth.signUp(this.registration.form.value).subscribe(res => {
      //console.log(res);
      if (res.result.user.accountStatus === 'approved'){
        localStorage.setItem('token', res.result.authToken);
        localStorage.setItem('user', JSON.stringify(res.result.user));
        this.location.saveLocationApiToken();
        this.router.navigateByUrl('/home/profile/editDetails');
      }
    }, error => {
      if (error.error.result){
        console.log(error.error.result.details[Object.keys(error.error.result.details)[0]].MESSAGE);
      } else {
        console.log(error.statusText);
      }
    });
  }
}
