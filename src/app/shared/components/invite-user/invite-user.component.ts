import {Component, Input, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ToastrService} from 'ngx-toastr';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {HelperService} from '../../../core/helper/helper.service';
import {BorrowersService} from '../../../features/roles/common/borrowers/services/borrowers.service';
import {ConstantService} from '../../../core/constant/constant.service';
import {StoreService} from '../../../core/store/store.service';
import {take} from 'rxjs/operators';

@Component({
  selector: 'app-invite-user',
  templateUrl: './invite-user.component.html',
  styleUrls: ['./invite-user.component.scss']
})
export class InviteUserComponent implements OnInit {
  @Input() role: string;
  borrower: FormGroup;
  constructor( private toaster: ToastrService,
               private activeModal: NgbActiveModal,
               private helper: HelperService,
               private fb: FormBuilder,
               private borrowerService: BorrowersService,
               public constant: ConstantService,
               public store: StoreService) { }

  ngOnInit(): void {
    this.helper.setModalPosition();
    this.borrower = this.fb.group({
      email: [null, [Validators.required, Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')]],
      name: [null, Validators.required],
      role: [this.role]
    });
  }

  close(): void{
    this.activeModal.close({status: 'no'});
  }
  onSubmit(): void{
    if (this.borrower.valid){
      this.borrowerService.sendInvite(this.borrower.value).pipe(take(1)).subscribe(res => {
        this.toaster.success('Invite sent');
        this.activeModal.close({status: 'yes'});
      }, error => {
        if (this.constant.RESPONSE_ERRORS[error.error.result.CODE]){
          this.toaster.error(error.error.result.details.MESSAGE);
        } else{
          this.toaster.error('Failed to send invite');
        }
      })
    } else{
      this.borrower.markAllAsTouched();
    }
  }
}
