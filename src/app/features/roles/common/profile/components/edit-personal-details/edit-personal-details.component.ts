import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ProfileService} from '../../services/profile.service';
import {HelperService} from '../../../../../../core/helper/helper.service';
import {DatePipe, TitleCasePipe} from '@angular/common';
import {PersonalDetailsModel} from '../../models/personal-details.model';
import {StoreService} from '../../../../../../core/store/store.service';
import {Router} from '@angular/router';
import {take} from 'rxjs/operators';
import {ConstantService} from '../../../../../../core/constant/constant.service';

@Component({
  selector: 'app-edit-personal-details',
  templateUrl: './edit-personal-details.component.html',
  styleUrls: ['./edit-personal-details.component.scss']
})
export class EditPersonalDetailsComponent implements OnInit {
  personalDetails: PersonalDetailsModel = {} as PersonalDetailsModel;
  socialMediaLinks = {facebook: true, instagram: false, linkedIn: false, twitter: false};
  loader = false;
  constructor(private fb: FormBuilder,
              private profile: ProfileService,
              private helper: HelperService,
              private datePipe: DatePipe,
              public store: StoreService,
              public constant: ConstantService,
              private router: Router,
              private titleCase: TitleCasePipe) { }

  ngOnInit(): void {
    this.initialisePersonalForm();
    this.setPersonalData();
    // this.personalDetails.valueChanges.subscribe(x => {
    //   console.log(x);
    // });
  }
  initialisePersonalForm(): void{
    this.personalDetails.form = this.fb.group({
      firstName:  [null, [Validators.required, Validators.pattern('([a-zA-Z]*)')]],
      lastName: [null, [Validators.required, Validators.pattern('([a-zA-Z]*)')]],
      socialMedia: this.fb.group({
        facebook: [null],
        linkedin: [null],
        instagram: [null],
        twitter: [null]
      }),
      bio: [null, [Validators.required, Validators.maxLength(500), Validators.pattern('^(.|\\s)*[a-zA-Z]+(.|\\s)*$')]],
      profileVideoUrl: [null],
      phoneNumber: [null, [Validators.required, Validators.pattern('^\\d{10}$')]],
      role: [{value: null, disabled: true }, Validators.required],
      birthday: this.fb.group({
        day: [null, Validators.required],
        month: [null, Validators.required],
        year: [null, Validators.required]
      }),
      email: [{value: null, disabled: true }, Validators.required],
      title: [null, [Validators.required, Validators.maxLength(50), Validators.pattern('^(.|\\s)*[a-zA-Z]+(.|\\s)*$')]],
      licenseNumber: [null, [Validators.required, Validators.maxLength(16), Validators.pattern('^[a-zA-Z0-9]+$')]],
      realEstateLicenseNumber: [null, [Validators.required, Validators.maxLength(16), Validators.pattern('^[a-zA-Z0-9]+$')]],
      brokerLicense: [null, [Validators.required, Validators.maxLength(16), Validators.pattern('^[a-zA-Z0-9]+$')]]
    });
  }

  setPersonalData(): void{
    this.profile.getUserData().pipe(take(1)).subscribe(res => {
      console.log(res);
      res = res.result;
      this.personalDetails.image = res.profilePictureUrl ? res.profilePictureUrl : null;
      this.personalDetails.form.patchValue({
        firstName: res.firstName,
        lastName: res.lastName,
        phoneNumber: res.phoneNumber,
        email: res.email,
        profileVideoUrl: res.profileVideoUrl,
        licenseNumber: res.licenseNumber,
        realEstateLicenseNumber: res.realEstateLicenseNumber,
        brokerLicense: res.brokerLicense,
        title: res.title,
        role: this.titleCase.transform(res.role.replace(/([a-z])([A-Z])/g, '$1 $2')),
        bio: res.bio
      });
      if (res.birthday){
        const birthday = this.datePipe.transform(res.birthday, 'yyyy-MM-dd');
        this.personalDetails.form.get(['birthday', 'year']).setValue(birthday.split('-')[0]);
        this.personalDetails.form.get(['birthday', 'month']).setValue(Number(birthday.split('-')[1]));
        this.personalDetails.form.get(['birthday', 'day']).setValue(Number(birthday.split('-')[2]));
      }
      if (res.socialMedia){
        this.personalDetails.form.get(['socialMedia', 'facebook']).setValue(res.socialMedia.facebook);
        this.personalDetails.form.get(['socialMedia', 'instagram']).setValue(res.socialMedia.instagram);
        this.personalDetails.form.get(['socialMedia', 'linkedin']).setValue(res.socialMedia.linkedin);
        this.personalDetails.form.get(['socialMedia', 'twitter']).setValue(res.socialMedia.twitter);
      }
      this.personalDetails.company = res.company;
      this.loader = true;
    }, error => {
      console.log(error);
    });
  }

  switchSocialMediaLink(val: string): void{
    const layers = {facebook: false, instagram: false, linkedIn: false, twitter: false};
    this.socialMediaLinks = Object.assign(this.socialMediaLinks, layers, {
      [val]: true
    });
  }
  onSubmit(): void{
    const user = this.store.getUserData();
    if (Object.values(this.personalDetails.form.get('birthday').value).some(element => element === null)){
      delete this.personalDetails.form.value.birthday;
    }
    if (this.personalDetails.fileUpload){
      this.profile.uploadProfilePicture(this.personalDetails.fileUpload).pipe(take(1)).subscribe(res => {
        user.profilePictureUrl = res.result.profilePictureUrl;
        localStorage.setItem('user', JSON.stringify(user));
        this.store.updateUserData(user);
      }, error => {
        console.log(error);
      });
    }
    console.log(this.personalDetails.form.value);
    this.profile.saveProfile({...this.personalDetails.form.value, ...{company: this.personalDetails.company}}).
    pipe(take(1)).subscribe(res => {
      user.firstName = res.result.firstName;
      user.lastName = res.result.lastName;
      localStorage.setItem('user', JSON.stringify(user));
      this.store.updateUserData(user);
      this.router.navigateByUrl('/home/profile').then();
      console.log(res);
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
    const dayCount = this.getDaysInMonth(this.personalDetails.form.get(['birthday', 'year']).value,
        this.personalDetails.form.get(['birthday', 'month']).value);
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
  handleFileInput(files): void{
    this.helper.handleFileInput(files, this.personalDetails);
  }
}
