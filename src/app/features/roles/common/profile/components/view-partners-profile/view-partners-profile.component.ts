import {Component, Input, OnInit} from '@angular/core';
import {DomSanitizer} from '@angular/platform-browser';
import {ProfileService} from '../../services/profile.service';
import {ProfessionalProfileModel} from '../../models/user-profile.model';
@Component({
  selector: 'app-view-partners-profile',
  templateUrl: './view-partners-profile.component.html',
  styleUrls: ['./view-partners-profile.component.scss']
})
export class ViewPartnersProfileComponent implements OnInit {
  partnerProfile: ProfessionalProfileModel = {} as ProfessionalProfileModel;
  loader = false;
  constructor(public sanitizer: DomSanitizer, private profile: ProfileService) { }

  ngOnInit(): void {
    this.profile.getUserData().subscribe(res => {
      console.log(res);
      this.partnerProfile = res.result;
      this.loader = true;
    }, error => {
      console.log(error);
    });
  }
  formatRole(data): string{
    return data.split(/(?=[A-Z])/).join(' ');
  }
}
