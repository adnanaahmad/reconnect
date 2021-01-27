import { Component, OnInit } from '@angular/core';
import {FormArray, FormBuilder, Validators} from '@angular/forms';
import { UserProfileEditModel } from '../../models/user-profile.model';
import {LocationService} from '../../../../../landing/services/location/location.service';
import {ProfileService} from '../../services/profile.service';
import {Router} from '@angular/router';
import {StoreService} from '../../../../../../core/store/store.service';
import {HelperService} from '../../../../../../core/helper/helper.service';
import {DatePipe} from '@angular/common';
@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.scss']
})
export class EditProfileComponent implements OnInit {
  userProfile: UserProfileEditModel = {} as UserProfileEditModel;
  socialMediaLinks = {facebook: true, instagram: false, linkedIn: false, twitter: false};
  token;
  states;
  cities;

  constructor(private fb: FormBuilder,
              private location: LocationService,
              private profile: ProfileService,
              private router: Router,
              private store: StoreService,
              private  helper: HelperService,
              private datePipe: DatePipe) {
  }

  ngOnInit(): void {
    this.getLocation();
    this.initialiseProfileForm();
    this.setProfileData();
  }

  getLocation(): void {
    this.location.getStates(this.store.getLocationApiToken()).subscribe(response => {
      this.states = response;
    }, error => {
      console.log(error);
    });
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
    return Array((new Date()).getFullYear() - 1920).fill(0).map((_, i) => 1920 + i);
  }

  public get months(): Array<string> {
    return Array(12).fill(0).map((i, idx) => this.getMonth(idx + 1));
  }

  public getDaysInMonth(year: number, month: number): number {
    return 32 - new Date(year, month - 1, 32).getDate();
  }

  initialiseProfileForm(): void {
    this.userProfile.profileForm = this.fb.group({
      firstName: [null, Validators.required],
      lastName: [null, Validators.required],
      bio: [null, Validators.required],
      phoneNumber: [null, Validators.required],
      gender: [null, Validators.required],
      website: [null, Validators.required],
      birthday: this.fb.group({
        month: [null, Validators.required],
        day: [null, Validators.required],
        year: [null, Validators.required],
      }),
      email: [null, Validators.required],
      city: [null, Validators.required],
      state: [null, Validators.required],
      addresses: new FormArray([]),
      socialMedia: this.fb.group({
        facebook: [null, Validators.required],
        linkedIn: [null, Validators.required],
        instagram: [null, Validators.required],
        twitter: [null, Validators.required]
      }),
    });
    // this.userProfile.profileForm.valueChanges.subscribe(x => console.log(x));
  }
  setProfileData(): void {
    this.profile.getUserData().subscribe(res => {
      console.log(res);
      const birthday = this.datePipe.transform(res.result.birthday, 'yyyy-MM-dd');
      this.userProfile.image = res.result.profilePictureUrl ?
          this.profile.STATIC_FILES_URL + res.result.profilePictureUrl : null;
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
          linkedIn: res.result.socialMedia ? res.result.socialMedia.linkedIn : null,
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
    if (this.userProfile.fileUpload){
      this.profile.uploadProfilePicture(this.userProfile.fileUpload).subscribe(res => {
        console.log(res);
        user.profilePictureUrl = res.result.profilePictureUrl;
        localStorage.setItem('user', JSON.stringify(user));
        this.store.updateUserData(user);
      }, error => {
        console.log(error);
      });
    }
    this.profile.saveProfile(this.userProfile.profileForm.value).subscribe(res => {
      console.log(res);
      user.firstName = res.result.firstName;
      user.lastName = res.result.lastName;
      localStorage.setItem('user', JSON.stringify(user));
      this.store.updateUserData(user);
      this.router.navigateByUrl('/home/profile');
    }, error => {
      console.log(error);
    });
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

  changeState(state): void {
    this.location.getCities(state, this.store.getLocationApiToken()).subscribe(res => {
      this.cities = res;
    });
  }

  setCity(state: string): void {
    this.location.getCities(state, this.store.getLocationApiToken()).subscribe(res1 => {
      this.cities = res1;
    }, error => {
      console.log(error);
    });
  }

  handleFileInput(files: FileList): void {
    this.helper.handleFileInput(files, this.userProfile);
  }
}

