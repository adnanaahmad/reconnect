import { Component, OnInit } from '@angular/core';
import {FormBuilder, Validators} from '@angular/forms';
import {LoginModel} from '../../models/login.model';
import {AuthService} from '../../services/auth/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  login: LoginModel = {} as LoginModel;
  constructor(private fb: FormBuilder, private loginService: AuthService) { }

  ngOnInit(): void {
    this.login.form = this.fb.group({
      email: [null, [Validators.required, Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')]],
      password: [null, Validators.required]
    });
  }
  onSubmit(): void{
    console.log(this.login.form.value);
    this.loginService.signIn(this.login.form.value).subscribe( x => {
      console.log(x);
    }, error => {
      //console.log(error);
    });
  }
}
