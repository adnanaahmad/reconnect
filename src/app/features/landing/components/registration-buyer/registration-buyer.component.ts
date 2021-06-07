import {Component, OnInit, Input, ElementRef, ViewChild, OnDestroy} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {AbstractControl, FormBuilder, FormControl, Validators} from '@angular/forms';
import {RegistrationBuyerModel} from '../../models/registration-buyer.model';
import {AuthService} from '../../services/auth/auth.service';
import {debounceTime, distinctUntilChanged, switchMap, take} from 'rxjs/operators';
import {HelperService} from '../../../../core/helper/helper.service';
import {ConstantService} from '../../../../core/constant/constant.service';
import {LocationService} from '../../services/location/location.service';
import {ToastrService} from 'ngx-toastr';
import {environment} from '../../../../../environments/environment';
import {WebSocketService} from '../../../../core/webSockets/web-socket.service';
import * as io from 'socket.io-client';
import {Subscription} from 'rxjs';
@Component({
  selector: 'app-registration-buyer',
  templateUrl: './registration-buyer.component.html',
  styleUrls: ['./registration-buyer.component.scss']
})
export class RegistrationBuyerComponent implements OnInit, OnDestroy {
  @ViewChild('password') password: ElementRef;
  @ViewChild('confirmPassword') confirmPassword: ElementRef;
  @ViewChild('showPassword') togglePassword: ElementRef;
  @ViewChild('showConfirmPassword') toggleConfirmPassword: ElementRef;
  registration: RegistrationBuyerModel = {} as RegistrationBuyerModel;
  subscription: Subscription;
  constructor(private router: Router,
              private fb: FormBuilder,
              private auth: AuthService,
              public helper: HelperService,
              private constant: ConstantService,
              private location: LocationService,
              private toaster: ToastrService,
              private webSocket: WebSocketService,
              private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    // this.registration.form.valueChanges.subscribe(res => {
    //   console.log(res);
    // });
    this.initialise();
    this.getReferralList();
    this.referralBasedRegistration();
  }
  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
  referralBasedRegistration(): void{
    this.activatedRoute.queryParams.pipe(take(1)).subscribe(params => {
      if (params.referrerId) {
        this.registration.screen = {one: false, two: false, three: true};
        this.registration.form.patchValue({
          email: params.email,
          referral: {
            type: 'user',
            details: params.referrerId
          }
        });
      }
    });
  }
  initialise(): void{
    this.registration.screen = {one: true, two: false, three: false};
    this.registration.referral = false;
    this.registration.other = false;
    this.registration.aboutUs = this.constant.aboutUs;
    this.registration.form = this.fb.group({
      role: [this.constant.role.BUYER],
      firstName: [null, [Validators.required, Validators.minLength(2), Validators.maxLength(30), Validators.pattern('^(?! )[A-Za-z ]*(?<! )$')]],
      lastName: [null, [Validators.required, Validators.minLength(2), Validators.maxLength(30), Validators.pattern('^(?! )[A-Za-z ]*(?<! )$')]],
      email: [null, [Validators.required, Validators.pattern('^(([^<>()[\\]\\\\.,;:\\s@\\"]+(\\.[^<>()[\\]\\\\.,;:\\s@\\"]+)*)|(\\".+\\"))@((\\[[0-9]{1,3}\\.[0-9]{1,3}\\.[0-9]{1,3}\\.[0-9]{1,3}\\])|(([a-zA-Z\\-0-9]+\\.)+[a-zA-Z]{2,}))$')]],
      password: [null, [Validators.required, Validators.minLength(8), Validators.maxLength(16)]],
      confirmPassword: [null, [Validators.required, Validators.minLength(8), Validators.maxLength(16)]],
      referral : this.fb.group({
        type: [null, Validators.required],
        details: [null, Validators.required],
      }),
    }, {validator: this.passwordConfirming});
    this.registration.agreed = new FormControl(null);
  }


  getReferralList(): void{
    this.subscription = this.auth.searchName.pipe(debounceTime(300), distinctUntilChanged()).subscribe( term => {
      if (term !== 1 && term.length > 2){
        this.auth.referenceList(term).pipe(take(1)).subscribe(data => {
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
    if (!this.registration.form.valid || !this.registration.agreed.value){
      this.registration.form.markAllAsTouched();
      this.registration.agreed.markAllAsTouched();
      if (this.registration.form.get('password').value !== this.registration.form.get('confirmPassword').value ||
          !this.registration.form.get('confirmPassword').value) {
        document.getElementById('confirmPasswordInput').classList.add('is-invalid');
        document.getElementById('confirmPasswordText').classList.add('danger');
      }
    } else {
      this.auth.signUp(this.registration.form.value).pipe(take(1)).subscribe(res => {
        if (res.result.user.accountStatus === 'approved'){
          localStorage.setItem('token', res.result.authToken);
          localStorage.setItem('user', JSON.stringify(res.result.user));
          this.webSocket.socket.disconnect();
          this.webSocket.socket = io(environment.serverUrl, {query: {token: res.result.authToken}});
          this.router.navigateByUrl('/home/profile').then();
          this.toaster.success('You have successfully logged in');
        }
      }, error => {
        if (error.error.result.CODE === 'BAD_REQUEST'){
          this.toaster.error(error.error.result.details.MESSAGE);
        } else {
          this.toaster.error(error.error.result.MESSAGE);
        }
      });
    }
  }
  hideProfessionalList(): void{
    this.registration.professional = null;
  }
  toggle(value): void{
    if (value) {
      this.auth.helperToggle(this.password.nativeElement, this.togglePassword.nativeElement);
    }
    else{
      this.auth.helperToggle(this.confirmPassword.nativeElement, this.toggleConfirmPassword.nativeElement);
    }
  }
  nextOnScreenOne(): void{
    if (this.registration.referral || this.registration.other ? !this.registration.form.get(['referral', 'details']).valid :
        !this.registration.form.get(['referral', 'type']).valid){
      this.registration.form.get(['referral', 'type']).markAllAsTouched();
      //this.registration.form.get(['referral', 'details']).markAllAsTouched();
    } else {
      this.registration.screen['two'] = true;
      this.registration.screen['one'] = false;
    }
  }
}
