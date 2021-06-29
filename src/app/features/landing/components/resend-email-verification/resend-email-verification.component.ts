import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {AuthService} from '../../services/auth/auth.service';
import {ToastrService} from 'ngx-toastr';
import {take} from 'rxjs/operators';
import {HelperService} from '../../../../core/helper/helper.service';

@Component({
  selector: 'app-resend-email-verification',
  templateUrl: './resend-email-verification.component.html',
  styleUrls: ['./resend-email-verification.component.scss']
})
export class ResendEmailVerificationComponent implements OnInit {
  form: FormGroup;
  nextScreen: boolean;
  constructor(private fb: FormBuilder,
              private auth: AuthService,
              private toaster: ToastrService,
              private helper: HelperService) { }

  ngOnInit(): void {
    this.nextScreen = false;
    this.form = this.fb.group({
      email: [null, [Validators.required, Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')]],
    });
  }
  onSubmit(): void{
    this.auth.resendEmailVerification(this.form.value).pipe(take(1)).subscribe(res => {
      this.nextScreen = true;
    }, error => {
      this.helper.handleApiError(error, 'Failed to send email verification');
    });
  }
}
