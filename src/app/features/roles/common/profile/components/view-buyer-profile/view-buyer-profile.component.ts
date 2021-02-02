import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {UserProfileModel} from '../../models/user-profile.model';
import {ProfileService} from '../../services/profile.service';
import {take} from 'rxjs/operators';

@Component({
  selector: 'app-view-buyer-profile',
  templateUrl: './view-buyer-profile.component.html',
  styleUrls: ['./view-buyer-profile.component.scss']
})
export class ViewBuyerProfileComponent implements OnInit {
  userProfile: UserProfileModel = {} as UserProfileModel;

  constructor( public profileService: ProfileService) { }
  ngOnInit(): void {
    this.userProfile.loader = false;
    this.profileService.getUserData().pipe(take(1)).subscribe(res => {
      this.userProfile = res.result;
      this.userProfile.loader = true;
    }, error => {
      console.log(error);
    });
  }
}
