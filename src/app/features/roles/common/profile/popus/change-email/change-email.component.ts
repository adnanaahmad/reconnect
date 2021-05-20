import { Component, OnInit } from '@angular/core';
import {HelperService} from '../../../../../../core/helper/helper.service';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {ToastrService} from 'ngx-toastr';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {BorrowersService} from '../../../borrowers/services/borrowers.service';
import {ConstantService} from '../../../../../../core/constant/constant.service';
import {StoreService} from '../../../../../../core/store/store.service';
import {take} from 'rxjs/operators';
import {ProfileService} from '../../services/profile.service';

@Component({
  selector: 'app-change-email',
  templateUrl: './change-email.component.html',
  styleUrls: ['./change-email.component.scss']
})
export class ChangeEmailComponent implements OnInit {
  email: FormControl;
  constructor( private toaster: ToastrService,
               private activeModal: NgbActiveModal,
               private helper: HelperService,
               public constant: ConstantService,
               public store: StoreService,
               private profileService: ProfileService) { }

  ngOnInit(): void {
    this.helper.setModalPosition();
    this.email = new FormControl(null, [Validators.required, Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')]);
  }

  close(): void{
    this.activeModal.close({status: 'no'});
  }
  onSubmit(): void{
    if (this.email.valid){
      this.profileService.editEmail({email: this.email.value}).pipe(take(1)).subscribe(res => {
        this.toaster.success('verification email sent');
        this.activeModal.close({status: 'yes'});
      }, error => {
        this.helper.handleApiError(error, 'Failed to send email verification');
      });
    } else{
      this.email.markAsTouched();
    }
  }
}
