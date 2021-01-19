import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';

@Component({
  selector: 'app-edit-partners-profile',
  templateUrl: './edit-partners-profile.component.html',
  styleUrls: ['./edit-partners-profile.component.scss']
})
export class EditPartnersProfileComponent implements OnInit {
  buttons: string[];
  selectedButton: string;
  constructor(private router: Router) { }

  ngOnInit(): void {
    this.buttons = ['Personal Details', 'Company Details'];
    this.selectedButton = this.buttons[0];
    this.router.navigateByUrl('/home/profile/edit/personalDetails');
  }
  switchTabs(button: string): void{
    this.selectedButton = button;
    button === this.buttons[0] ? this.router.navigateByUrl('/home/profile/edit/personalDetails') :
        this.router.navigateByUrl('/home/profile/edit/companyDetails');
  }
}
