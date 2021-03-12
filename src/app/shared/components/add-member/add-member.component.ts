import {Component, Input, OnInit} from '@angular/core';
import {HelperService} from '../../../core/helper/helper.service';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {BuyerDashboardService} from '../../../features/roles/buyer/home-buying-dashboard/services/buyer-dashboard.service';
import {ConstantService} from '../../../core/constant/constant.service';
import {FormControl, Validators} from '@angular/forms';
import {take} from 'rxjs/operators';
import {ToastrService} from 'ngx-toastr';

@Component({
    selector: 'app-add-member',
    templateUrl: './add-member.component.html',
    styleUrls: ['./add-member.component.scss']
})
export class AddMemberComponent implements OnInit {
    @Input() role;
    public members: any;
    searchName: FormControl;

    constructor(private helper: HelperService,
                public modal: NgbActiveModal,
                private dashboard: BuyerDashboardService,
                private constant: ConstantService,
                private toaster: ToastrService) {
    }

    ngOnInit(): void {
        this.helper.setModalPosition();
        this.searchName = new FormControl(null, Validators.required);
        console.log(this.role);
        this.getProfessionals();
    }

    addMember(member, id?): void {
        console.log(member);
        if (this.constant.chooseRole[this.role] === this.constant.role.HOME_INSPECTOR ||
            this.constant.chooseRole[this.role] === this.constant.role.INSURANCE) {
            this.dashboard.buyerRequestQuote({professionalId: member._id}).pipe(take(1)).subscribe(res => {
                this.toaster.success('Request Sent');
                document.getElementById(id).style.display = 'none';
                document.getElementById(id + this.constant.quoteRequestStatus.PENDING).style.display = 'block';
                //this.modal.close({status: 'yes', data: res.result});
            }, error => {
                console.log(error);
                this.toaster.success('Failed to send request');
            });
        } else {
            this.dashboard.addTeamMember({userId: member._id}).pipe(take(1)).subscribe(res => {
                this.modal.close({status: 'yes', data: res.result});
            }, error => {
                console.log(error);
            });
        }
    }

    getProfessionals(): void {
        this.dashboard.getProfessionals(this.constant.chooseRole[this.role]).pipe(take(1)).subscribe(res => {
            console.log(res);
            this.members = res.result;
        }, error => {
            console.log(error);
        });
    }
}
