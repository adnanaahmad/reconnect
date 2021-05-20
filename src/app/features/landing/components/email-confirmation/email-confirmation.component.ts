import { Component, OnInit } from '@angular/core';
import {AuthService} from '../../services/auth/auth.service';
import {take} from 'rxjs/operators';
import {ActivatedRoute} from '@angular/router';
import {Subscription} from 'rxjs';
import {ConstantService} from '../../../../core/constant/constant.service';

@Component({
  selector: 'app-email-confirmation',
  templateUrl: './email-confirmation.component.html',
  styleUrls: ['./email-confirmation.component.scss']
})
export class EmailConfirmationComponent implements OnInit {
  subscription: Subscription;
  responseMessage: string;
  constructor(private auth: AuthService,
              private activatedRoute: ActivatedRoute,
              private constant: ConstantService) { }

  ngOnInit(): void {
    localStorage.clear();
    this.subscription = this.activatedRoute.queryParams.subscribe(params => {
      if (params.token){
        localStorage.setItem('token', params.token);
        this.confirmEmail();
      }
    });

  }
  confirmEmail(): void{
    this.auth.editEmail().pipe(take(1)).subscribe(res => {
      this.responseMessage = 'Your primary email has successfully been changed. Now login with your new email address.';
    }, error => {
        this.responseMessage = 'Failed to update your primary email';
    });
  }
}
