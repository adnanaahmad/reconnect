import {Component, Input, OnInit} from '@angular/core';
import {UserProfileModel} from '../../models/user-profile.model';
import {ProfileService} from '../../services/profile.service';

@Component({
  selector: 'app-view-buyer-profile',
  templateUrl: './view-buyer-profile.component.html',
  styleUrls: ['./view-buyer-profile.component.scss']
})
export class ViewBuyerProfileComponent implements OnInit {
  userProfile: UserProfileModel = {} as UserProfileModel;

  constructor( public profileService: ProfileService) { }

  ngOnInit(): void {
    this.profileService.getUserData().subscribe(res => {
      this.userProfile = res.result;
      console.log(res.result);
      console.log(this.userProfile);
    }, error => {
      console.log(error);
    });
  }

}
