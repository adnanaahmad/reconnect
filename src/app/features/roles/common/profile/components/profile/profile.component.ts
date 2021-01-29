import { Component, OnInit } from '@angular/core';
import { UserProfileModel} from '../../models/user-profile.model';
import {StoreService} from '../../../../../../core/store/store.service';
import {ProfileService} from '../../services/profile.service';
import {Router} from '@angular/router';
import {ConstantService} from '../../../../../../core/constant/constant.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  constructor(public store: StoreService, public router: Router, public constant: ConstantService) { }

  ngOnInit(): void {}
  editProfile(): void{
    this.store.role === this.constant.role.BUYER ? this.router.navigateByUrl('/home/profile/editDetails') :
        this.router.navigateByUrl('/home/profile/edit/personalDetails');
  }
}
