import {Component, Input, OnInit} from '@angular/core';
import {HelperService} from '../../../core/helper/helper.service';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {BuyerDashboardService} from '../../../features/roles/buyer/home-buying-dashboard/services/buyer-dashboard.service';
import {ConstantService} from '../../../core/constant/constant.service';
import {FormControl, Validators} from '@angular/forms';
import {take} from 'rxjs/operators';
import {ToastrService} from 'ngx-toastr';
import {Router} from '@angular/router';

@Component({
    selector: 'app-add-member',
    templateUrl: './add-member.component.html',
    styleUrls: ['./add-member.component.scss']
})
export class AddMemberComponent implements OnInit {
    @Input() role;
    @Input() teamId;
    public members: any;
    searchName: FormControl;
    addButtonDisable: boolean;

    constructor(private helper: HelperService,
                public modal: NgbActiveModal,
                private dashboard: BuyerDashboardService,
                private constant: ConstantService,
                private toaster: ToastrService,
                private router: Router) {
    }

    ngOnInit(): void {
        this.helper.setModalPosition();
        this.searchName = new FormControl(null, Validators.required);
        console.log(this.role);
        this.getProfessionals();
        this.addButtonDisable = false;
    }

    addMember(member, id?): void {
        console.log(member);
        if (this.constant.chooseRole[this.role] === this.constant.role.HOME_INSPECTOR ||
            this.constant.chooseRole[this.role] === this.constant.role.INSURANCE) {
            this.dashboard.startPrivateChat({professionalId: member._id}).pipe(take(1)).subscribe(res => {
                this.chatWithProfessional(member._id);
            }, error => {
                console.log(error);
                this.toaster.error('Failed to start chat');
            });
        } else {
            this.addButtonDisable = true;
            this.dashboard.addTeamMember({userId: member._id}).pipe(take(1)).subscribe(res => {
                this.toaster.success('Professional added to your team');
                this.modal.close({status: 'yes', data: res.result});
            }, error => {
                console.log(error);
                this.toaster.error('Failed to add professional');
                this.addButtonDisable = false;
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
    sendEmail(email: string): void{
        window.open(`mailto:${email}`);
    }
    viewProfile(id): void{
        const add = 'true';
        this.router.navigateByUrl('/home/profile/viewProfile/' + id + '?add=' + add).then();
    }
    chatWithProfessional(id: string): void{
        this.router.navigateByUrl(`/home/teamMessageBoard?professional=${id}`).then();
    }
}
