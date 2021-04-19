import { Component, OnInit } from '@angular/core';
import {FormArray, FormBuilder, Validators} from '@angular/forms';
import { UserProfileEditModel } from '../../models/user-profile.model';
import {LocationService} from '../../../../../landing/services/location/location.service';
import {ProfileService} from '../../services/profile.service';
import {Router} from '@angular/router';
import {StoreService} from '../../../../../../core/store/store.service';
import {HelperService} from '../../../../../../core/helper/helper.service';
import {DatePipe} from '@angular/common';
import {take} from 'rxjs/operators';
import {ToastrService} from 'ngx-toastr';
import {forkJoin} from 'rxjs';
@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.scss']
})
export class EditProfileComponent implements OnInit {
  userProfile: UserProfileEditModel = {} as UserProfileEditModel;
  socialMediaLinks = {facebook: true, instagram: false, linkedIn: false, twitter: false};

  constructor(private fb: FormBuilder,
              private location: LocationService,
              private profile: ProfileService,
              private router: Router,
              private store: StoreService,
              private helper: HelperService,
              private datePipe: DatePipe,
              private toaster: ToastrService) {
  }

  ngOnInit(): void {
    this.userProfile.loader = false;
    this.getLocation();
    this.initialiseProfileForm();
    this.setProfileData();
  }
  getMonth(idx): string {
    const objDate = new Date();
    objDate.setDate(1);
    objDate.setMonth(idx - 1);
    return objDate.toLocaleString('en-us', {month: 'long'});
  }

  public get days(): Array<number> {
    const dayCount = this.getDaysInMonth(this.userProfile.profileForm.get(['birthday', 'year']).value,
        this.userProfile.profileForm.get(['birthday', 'month']).value);
    return Array(dayCount).fill(0).map((i, idx) => idx + 1);
  }

  public get years(): Array<number> {
    return Array((new Date()).getFullYear() - 17 - 1920).fill(0).map((_, i) => 1920 + i);
  }

  public get months(): Array<string> {
    return Array(12).fill(0).map((i, idx) => this.getMonth(idx + 1));
  }

  public getDaysInMonth(year: number, month: number): number {
    return 32 - new Date(year, month - 1, 32).getDate();
  }

  initialiseProfileForm(): void {
    this.userProfile.profileForm = this.fb.group({
      firstName: [null, [Validators.required, Validators.pattern('([a-zA-Z]*)')]],
      lastName: [null, [Validators.required, Validators.pattern('([a-zA-Z]*)')]],
      phoneNumber: [null, [Validators.required, Validators.pattern('^\\d{10}$')]],
      gender: [null],
      birthday: this.fb.group({
        month: [null, Validators.required],
        day: [null, Validators.required],
        year: [null, Validators.required],
      }),
      email: [{value: null, disabled: true }, Validators.required],
      city: [null, Validators.required],
      state: [null, Validators.required],
      addresses: new FormArray([]),
      socialMedia: this.fb.group({
        facebook: [null],
        linkedin: [null],
        instagram: [null],
        twitter: [null]
      }),
    });
    // this.userProfile.profileForm.valueChanges.subscribe(x => console.log(x));
  }
  setProfileData(): void {
    this.profile.getUserData().pipe(take(1)).subscribe(res => {
      this.userProfile.loader = true;
      const birthday = res.result.birthday;
      this.userProfile.image = res.result.profilePictureUrl ? res.result.profilePictureUrl : null;
      this.setCity(res.result.state);
      this.userProfile.profileForm.patchValue({
        firstName: res.result.firstName,
        lastName: res.result.lastName,
        bio: res.result.bio,
        website: res.result.website,
        city: res.result.city,
        state: res.result.state,
        phoneNumber: res.result.phoneNumber,
        gender: res.result.gender,
        birthday: {
          month: birthday ? Number(birthday.split('-')[1]) : null,
          day: birthday ? Number(birthday.split('-')[2]) : null,
          year: birthday ? birthday.split('-')[0] : null,
        },
        socialMedia: {
          facebook: res.result.socialMedia ? res.result.socialMedia.facebook : null,
          instagram: res.result.socialMedia ? res.result.socialMedia.instagram : null,
          twitter: res.result.socialMedia ? res.result.socialMedia.twitter : null,
          linkedin: res.result.socialMedia ? res.result.socialMedia.linkedin : null,
        },
        email: res.result.email,
      });
      res.result.addresses.forEach((item) => {
        this.address.push(this.fb.control(item));
      });
    }, error => {
      console.log(error);
    });
  }

  onSubmit(): void {
    // TODO: Use EventEmitter with form value
    const user = this.store.getUserData();
    console.log(this.userProfile.profileForm.value);
    if (Object.values(this.userProfile.profileForm.get('birthday').value).some(element => element === null)){
      delete this.userProfile.profileForm.value.birthday;
    }
    if (this.userProfile.fileUpload){
      forkJoin([this.profile.uploadProfilePicture(this.userProfile.fileUpload),
        this.profile.saveProfile(this.userProfile.profileForm.value)]).pipe(take(1)).subscribe(res => {
        user.profilePictureUrl = res[0].result.profilePictureUrl;
        user.firstName = res[1].result.firstName;
        user.lastName = res[1].result.lastName;
        localStorage.setItem('user', JSON.stringify(user));
        this.store.updateUserData(user);
        this.toaster.success('Successfully Saved');
        this.router.navigateByUrl('/home/profile').then();

      }, error => {
        console.log(error);
      });
    } else{
      this.profile.saveProfile(this.userProfile.profileForm.value).pipe(take(1)).subscribe(res => {
        console.log(res);
        user.firstName = res.result.firstName;
        user.lastName = res.result.lastName;
        localStorage.setItem('user', JSON.stringify(user));
        this.store.updateUserData(user);
        this.toaster.success('Successfully Saved');
        this.router.navigateByUrl('/home/profile');
      }, error => {
        console.log(error);
        this.toaster.error('Failed To Save');
      });
    }
  }

  get address(): FormArray {
    return this.userProfile.profileForm.controls.addresses as FormArray;
  }

  addAddress(): void {
    this.address.push(this.fb.control(null));
  }

  switchSocialMediaLink(val: string): void {
    const layers = {facebook: false, instagram: false, linkedIn: false, twitter: false};
    this.socialMediaLinks = Object.assign(this.socialMediaLinks, layers, {
      [val]: true
    });
  }
  getLocation(): void {
    this.profile.getLocation(this.userProfile);
  }
  changeState(state): void {
    this.profile.changeState(state, this.userProfile);
  }

  setCity(state: string): void {
    this.profile.setCity(state, this.userProfile);
  }

  handleFileInput(files: FileList): void {
    this.helper.handleFileInput(files, this.userProfile);
  }
}

