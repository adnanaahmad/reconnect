import { Component, OnInit } from '@angular/core';
import {ProfessionalProfileModel} from '../../models/user-profile.model';
import {DomSanitizer} from '@angular/platform-browser';
import {ProfileService} from '../../services/profile.service';
import {HelperService} from '../../../../../../core/helper/helper.service';
import {StoreService} from '../../../../../../core/store/store.service';
import {ConstantService} from '../../../../../../core/constant/constant.service';
import {take} from 'rxjs/operators';
import {FormControl} from '@angular/forms';
import {Location} from '@angular/common';
import {ActivatedRoute} from '@angular/router';
import {BuyerDashboardService} from '../../../../buyer/home-buying-dashboard/services/buyer-dashboard.service';
import {ToastrService} from 'ngx-toastr';

@Component({
  selector: 'app-view-profile',
  templateUrl: './view-profile.component.html',
  styleUrls: ['./view-profile.component.scss']
})
export class ViewProfileComponent implements OnInit {

  partnerProfile: ProfessionalProfileModel = {} as ProfessionalProfileModel;
  messageBody: FormControl;
  loader = false;
  hideAddButton: boolean;
  constructor(public sanitizer: DomSanitizer,
              private profile: ProfileService,
              public helper: HelperService,
              public store: StoreService,
              public constant: ConstantService,
              public location: Location,
              private activatedRoute: ActivatedRoute,
              private dashboard: BuyerDashboardService,
              private toaster: ToastrService) {}

  ngOnInit(): void {
    this.messageBody = new FormControl([null]);
    const routeParams = this.activatedRoute.snapshot.paramMap;
    this.partnerProfile._id = routeParams.get('id');
    this.activatedRoute.queryParams.pipe(take(1)).subscribe(params => {
      if (params.add) {
        this.hideAddButton = (params.add === 'true');
      }
    });
    this.getUserDetails();
  }
  getUserDetails(): void{
    this.store.updateProgressBarLoading(true);
    this.profile.getUserDataById(this.partnerProfile._id).pipe(take(1)).subscribe(res => {
      console.log(res);
      this.store.updateProgressBarLoading(false);
      this.partnerProfile = res.result;
      this.partnerProfile.profileVideoUrl = res.result.profileVideoUrl ?
          this.sanitizer.bypassSecurityTrustResourceUrl(this.helper.getEmbeddedVideoURL(res.result.profileVideoUrl)) : null;
      if (res.result.profileVideoUrl ? !res.result.profileVideoUrl.changingThisBreaksApplicationSecurity : false){
        this.partnerProfile.profileVideoUrl = null;
      }
      this.loader = true;
    }, error => {
      this.store.updateProgressBarLoading(false);
      console.log(error);
    });
  }
  formatRole(data): string{
    return data.split(/(?=[A-Z])/).join(' ');
  }
  sendEmail(email: string): void{
    window.location.href = (`mailto:${email}?body=${this.messageBody.value}`);
  }
  addMember(): void {
    if (this.partnerProfile.role === this.constant.role.HOME_INSPECTOR ||
        this.partnerProfile.role === this.constant.role.INSURANCE) {
      this.dashboard.buyerRequestQuote({professionalId: this.partnerProfile._id}).pipe(take(1)).subscribe(res => {
        this.toaster.success('Request Sent');
        this.hideAddButton = false;
        window.history.replaceState({}, '', `/home/profile/viewProfile/${this.partnerProfile._id}?add=false`);
      }, error => {
        console.log(error);
        this.toaster.error('Failed to send request');
      });
    } else {
      this.dashboard.addTeamMember({userId: this.partnerProfile._id}).pipe(take(1)).subscribe(res => {
        this.toaster.success('Professional added to your team');
        this.hideAddButton = false;
        window.history.replaceState({}, '', `/home/profile/viewProfile/${this.partnerProfile._id}?add=false`);
      }, error => {
        console.log(error);
        this.toaster.error('Failed to add professional');
      });
    }
  }
}
