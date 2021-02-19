import { Component, OnInit } from '@angular/core';
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
  setPassword: SetPasswordModel = {} as SetPasswordModel;
  constructor(private fb: FormBuilder, private activatedRoute: ActivatedRoute,
              private router: Router,
              private auth: AuthService,
              private toaster: ToastrService) {
    activatedRoute.queryParams.subscribe(params => {
      this.setPassword.firstName = params.firstName;
      this.setPassword.lastName = params.lastName;
      this.setPassword.token = params.token;
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
    this.auth.completeRegistration({password: this.setPassword.form.get('password').value}).
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

}
