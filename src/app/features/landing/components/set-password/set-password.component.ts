import { Component, OnInit } from '@angular/core';
import {LoginModel} from '../../models/login.model';
import {FormBuilder, Validators} from '@angular/forms';
import {SetPasswordModel} from '../../models/set-password.model';

@Component({
  selector: 'app-set-password',
  templateUrl: './set-password.component.html',
  styleUrls: ['./set-password.component.scss']
})
export class SetPasswordComponent implements OnInit {
  setPassword: SetPasswordModel = {} as SetPasswordModel;
  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
    this.setPassword.form = this.fb.group({
      password: [null, Validators.required],
      confirmPassword: [null, Validators.required]
    });
  }
  onSubmit(): void{
    console.log(this.setPassword.form.value);
  }

}
