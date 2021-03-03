import {Component, Input, OnInit} from '@angular/core';
import {HelperService} from '../../../../../../core/helper/helper.service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {take} from 'rxjs/operators';
import {BuyerTransactionDetailsService} from '../../services/buyer-transaction-details.service';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {ToastrService} from 'ngx-toastr';

@Component({
    selector: 'app-add-property-mls',
    templateUrl: './add-property-mls.component.html',
    styleUrls: ['./add-property-mls.component.scss']
})
export class AddPropertyMlsComponent implements OnInit {
    @Input() loanId: string;
    mlsForm: FormGroup;

    constructor(private helper: HelperService,
                private fb: FormBuilder,
                private mlsService: BuyerTransactionDetailsService,
                public activeModal: NgbActiveModal,
                private toaster: ToastrService) {
    }

    ngOnInit(): void {
        this.helper.setModalPosition();
        this.initializeForm();
    }

    initializeForm(): void {
        this.mlsForm = this.fb.group({
            targetProperty: [null, Validators.required],
            loanId: [this.loanId],
        });
    }

    onSubmit(): void {
        if (this.mlsForm.valid) {
            this.mlsService.setTargetProperty(this.mlsForm.value).pipe(take(1)).subscribe(res => {
                console.log(res);
                this.activeModal.close({status: 'yes', data: res.result.targetPropertyDetails});
            }, error => {
                this.toaster.error('Invalid MLS number');
            });
        } else {
            this.mlsForm.markAllAsTouched();
        }
    }

    close(): void {
        this.activeModal.close({status: 'no'});
    }
}
