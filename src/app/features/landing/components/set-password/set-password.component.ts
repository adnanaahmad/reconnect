import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {LoginModel} from '../../models/login.model';
import {AbstractControl, FormBuilder, Validators} from '@angular/forms';
import {SetPasswordModel} from '../../models/set-password.model';
import {ActivatedRoute, Router} from '@angular/router';
import {AuthService} from '../../services/auth/auth.service';
import {ToastrService} from 'ngx-toastr';
import {take} from 'rxjs/operators';

@Component({
  selector: 'app-set-password',
  templateUrl: './set-password.component.html',
  styleUrls: ['./set-password.component.scss']
})
export class SetPasswordComponent implements OnInit {
  @ViewChild('password') password: ElementRef;
  @ViewChild('confirmPassword') confirmPassword: ElementRef;
  @ViewChild('showPassword') togglePassword: ElementRef;
  @ViewChild('showConfirmPassword') toggleConfirmPassword: ElementRef;
  setPassword: SetPasswordModel = {} as SetPasswordModel;
  constructor(private fb: FormBuilder, private activatedRoute: ActivatedRoute,
              private router: Router,
              private auth: AuthService,
              private toaster: ToastrService) {
    activatedRoute.queryParams.subscribe(params => {
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
