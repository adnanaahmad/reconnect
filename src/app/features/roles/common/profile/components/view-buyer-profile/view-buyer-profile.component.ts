import {Component, OnInit} from '@angular/core';
import {UserProfileModel} from '../../models/user-profile.model';
import {ProfileService} from '../../services/profile.service';
import {take} from 'rxjs/operators';
import {NgbModal, NgbModalConfig} from '@ng-bootstrap/ng-bootstrap';
import {ChangeEmailComponent} from '../../popus/change-email/change-email.component';

@Component({
  selector: 'app-view-buyer-profile',
  templateUrl: './view-buyer-profile.component.html',
  styleUrls: ['./view-buyer-profile.component.scss']
})
export class ViewBuyerProfileComponent implements OnInit {
  userProfile: UserProfileModel = {} as UserProfileModel;

  constructor( public profileService: ProfileService,
               private modalService: NgbModal,
               private config: NgbModalConfig,) {
    config.container = 'app-view-buyer-profile';
    config.centered = true;
  }
  ngOnInit(): void {
    this.userProfile.loader = false;
    this.profileService.getUserData().pipe(take(1)).subscribe(res => {
      this.userProfile = res.result;
      this.userProfile.loader = true;
    }, error => {
      console.log(error);
    });
  }
  editEmail(): void{
    const modalRef = this.modalService.open(ChangeEmailComponent);
    modalRef.result.then((result) => {
      if (result.status === 'yes') {
      }
    }, error => {
      //console.log(error);
    });
  }
}
