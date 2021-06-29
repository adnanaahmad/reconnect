import { Component, OnInit } from '@angular/core';
import {FormBuilder, Validators} from '@angular/forms';
import {LoginModel} from '../../models/login.model';
import {AuthService} from '../../services/auth/auth.service';
import {Router} from '@angular/router';
import {ConstantService} from '../../../../core/constant/constant.service';
import {LocationService} from '../../services/location/location.service';
import { ToastrService } from 'ngx-toastr';
import {take} from 'rxjs/operators';
import {WebSocketService} from '../../../../core/webSockets/web-socket.service';
import {environment} from '../../../../../environments/environment';
import * as io from 'socket.io-client';
import {HelperService} from '../../../../core/helper/helper.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  login: LoginModel = {} as LoginModel;
  constructor(private fb: FormBuilder,
              private loginService: AuthService,
              private router: Router,
              private constant: ConstantService,
              private location: LocationService,
              private toaster: ToastrService,
              private webSocket: WebSocketService,
              private helper: HelperService) { }

  ngOnInit(): void {
    this.login.resendEmail = false;
    localStorage.clear();
    this.webSocket.socket.disconnect();
    this.login.form = this.fb.group({
      email: [null, [Validators.required, Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')]],
      password: [null, Validators.required]
    });
  }
  onSubmit(): void{
    this.loginService.signIn(this.login.form.value).pipe(take(1)).subscribe( res => {
      if (res.result.user.accountStatus === 'approved'){
        localStorage.setItem('token', res.result.authToken);
        localStorage.setItem('user', JSON.stringify(res.result.user));
        this.webSocket.socket.disconnect();
        this.webSocket.socket = io(environment.serverUrl, {query: {token: res.result.authToken}});
        this.toaster.success('You have successfully logged in');
        if (res.result.user.role === this.constant.role.BUYER){
          this.router.navigateByUrl('/home/homeBuyingDashboard').then();
        } else {
          this.router.navigateByUrl('/home/dashboard').then();
        }
      }
    }, error => {
      this.helper.handleApiError(error, 'Failed to login');
      if ((error.error.result.CODE === this.constant.RESPONSE_ERRORS.BAD_REQUEST) &&
          error.error.result.details.CODE === this.constant.RESPONSE_ERRORS.USER_REGISTRATION_NOT_COMPLETE){
       this.login.resendEmail = true;
      }
    });
  }
}
