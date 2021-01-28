import { Component, OnInit } from '@angular/core';
import { UserProfileModel} from '../../models/user-profile.model';
import {StoreService} from '../../../../../../core/store/store.service';
import {ProfileService} from '../../services/profile.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  constructor(public store: StoreService, public router: Router) { }

  ngOnInit(): void {}
  editProfile(): void{
    this.store.role.subscribe(res => {
      if (res === 'buyer'){
        this.router.navigateByUrl('/home/profile/editDetails');
      } else {
        this.router.navigateByUrl('/home/profile/edit/personalDetails');
      }
    });
  }
}
