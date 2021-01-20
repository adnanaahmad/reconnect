import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {KeyValue} from '@angular/common';
import {HelperService} from '../../../../../../core/helper/helper.service';

@Component({
  selector: 'app-edit-partners-profile',
  templateUrl: './edit-partners-profile.component.html',
  styleUrls: ['./edit-partners-profile.component.scss']
})
export class EditPartnersProfileComponent implements OnInit {
  buttons: any;
  selectedButton: string;
  constructor(private router: Router, public helper: HelperService) { }

  ngOnInit(): void {
    this.buttons =
        {
          personalDetails: 'Personal Details',
          companyDetails: 'Company Details'
        };
    this.setTabOnLoad();
  }
  switchTabs(button: string): void{
    this.selectedButton = button;
    button === this.buttons.personalDetails ? this.router.navigateByUrl('/home/profile/edit/personalDetails') :
        this.router.navigateByUrl('/home/profile/edit/companyDetails');
  }
  setTabOnLoad(): void{
    this.router.url === '/home/profile/edit/companyDetails' ? this.selectedButton = this.buttons.companyDetails :
        this.selectedButton = this.buttons.personalDetails;
  }
}
