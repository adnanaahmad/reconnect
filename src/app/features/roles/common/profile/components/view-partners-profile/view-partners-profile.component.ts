import {Component, Input, OnInit} from '@angular/core';
import {DomSanitizer} from '@angular/platform-browser';
import {ProfileService} from '../../services/profile.service';
import {ProfessionalProfileModel} from '../../models/user-profile.model';
import {take} from 'rxjs/operators';
import {HelperService} from '../../../../../../core/helper/helper.service';
@Component({
  selector: 'app-view-partners-profile',
  templateUrl: './view-partners-profile.component.html',
  styleUrls: ['./view-partners-profile.component.scss']
})
export class ViewPartnersProfileComponent implements OnInit {
  partnerProfile: ProfessionalProfileModel = {} as ProfessionalProfileModel;
  loader = false;
  constructor(public sanitizer: DomSanitizer,
              private profile: ProfileService,
              public helper: HelperService) { }

  ngOnInit(): void {
    this.profile.getUserData().pipe(take(1)).subscribe(res => {
      console.log(res);
      this.partnerProfile = res.result;
      this.partnerProfile.profileVideoUrl = this.sanitizer.bypassSecurityTrustResourceUrl(this.helper.getEmbeddedVideoURL(res.result.profileVideoUrl));
      this.loader = true;
    }, error => {
      console.log(error);
    });
  }
  formatRole(data): string{
    return data.split(/(?=[A-Z])/).join(' ');
  }
}
