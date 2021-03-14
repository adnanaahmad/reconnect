import {Component, ElementRef, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {AbstractControl, FormBuilder, Validators} from '@angular/forms';
import {SetPasswordModel} from '../../models/set-password.model';
import {ActivatedRoute, Router} from '@angular/router';
import {AuthService} from '../../services/auth/auth.service';
import {ToastrService} from 'ngx-toastr';
import {take} from 'rxjs/operators';
import {ConstantService} from '../../../../core/constant/constant.service';
import {environment} from '../../../../../environments/environment';
import {WebSocketService} from '../../../../core/webSockets/web-socket.service';
import * as io from 'socket.io-client';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-set-password',
  templateUrl: './set-password.component.html',
  styleUrls: ['./set-password.component.scss']
})
export class SetPasswordComponent implements OnInit, OnDestroy {
  @ViewChild('password') password: ElementRef;
  @ViewChild('confirmPassword') confirmPassword: ElementRef;
  @ViewChild('showPassword') togglePassword: ElementRef;
  @ViewChild('showConfirmPassword') toggleConfirmPassword: ElementRef;
  setPassword: SetPasswordModel = {} as SetPasswordModel;
  subscription: Subscription;
  constructor(private fb: FormBuilder,
              private activatedRoute: ActivatedRoute,
              private router: Router,
              private auth: AuthService,
              private toaster: ToastrService,
              private constant: ConstantService,
              private webSocket: WebSocketService) {
    this.subscription = this.activatedRoute.queryParams.subscribe(params => {
      this.setPassword.firstName = params.firstName;
      this.setPassword.lastName = params.lastName;
      this.setPassword.token = params.token;
      this.setPassword.resetPassword = (params.resetPassword === 'true');
    });
  }

  ngOnInit(): void {
    this.setPassword.form = this.fb.group({
      password: [null, [Validators.required, Validators.minLength(8), Validators.maxLength(16), Validators.pattern('^((?!.*[\\s])(?=)(?=.).{8,16})')]],
      confirmPassword: [null, [Validators.required, Validators.minLength(8), Validators.maxLength(16)]]
    }, {validator: this.passwordConfirming});
  }
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  onSubmit(): void{
    localStorage.setItem('token', this.setPassword.token);
    this.setPassword.resetPassword ? this.helperSubmit('resetPassword') : this.helperSubmit('completeRegistration');
  }
  helperSubmit(api): void{
    this.auth[api]({password: this.setPassword.form.get('password').value}).
    pipe(take(1)).subscribe(res => {
      if (res.result.user.accountStatus === 'approved'){
        localStorage.setItem('token', res.result.authToken);
        localStorage.setItem('user', JSON.stringify(res.result.user));
        this.webSocket.socket.disconnect();
        this.webSocket.socket = io(environment.serverUrl, {query: {token: res.result.authToken}});
        res.result.user.role === this.constant.role.BUYER ? this.router.navigateByUrl('/home/profile').then() :
            this.router.navigateByUrl('/home/profile/edit/personalDetails').then();
        this.toaster.success('You have successfully logged in');
      }
    }, error => {
      if (error.error.result.CODE === 'BAD_REQUEST'){
        this.toaster.error(error.error.result.details.MESSAGE);
      } else {
        this.toaster.error(error.error.result.MESSAGE);
      }
      localStorage.clear();
    });
  }
  passwordConfirming(c: AbstractControl): { invalid: boolean } {
    if (c.get('password').value !== c.get('confirmPassword').value) {
      return {invalid: true};
    }
  }
  toggle(value): void{
    if (value) {
      this.auth.helperToggle(this.password.nativeElement, this.togglePassword.nativeElement);
    }
     else{
      this.auth.helperToggle(this.confirmPassword.nativeElement, this.toggleConfirmPassword.nativeElement);
    }
  }
}
