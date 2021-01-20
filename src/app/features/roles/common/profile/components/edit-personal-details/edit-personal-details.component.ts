import { Component, OnInit } from '@angular/core';
import {FormBuilder, Validators} from '@angular/forms';

@Component({
  selector: 'app-edit-personal-details',
  templateUrl: './edit-personal-details.component.html',
  styleUrls: ['./edit-personal-details.component.scss']
})
export class EditPersonalDetailsComponent implements OnInit {
  personalDetails: any;
  socialMediaLinks = {facebook: true, instagram: false, linkedIn: false, twitter: false};
  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
    this.personalDetails = this.fb.group({
      firstName:  [null, Validators.required],
      lastName: [null, Validators.required],
      socialMedia: this.fb.group({
        facebook: [null, Validators.required],
        linkedIn: [null, Validators.required],
        instagram: [null, Validators.required],
        twitter: [null, Validators.required]
      }),
      bio: [null, Validators.required],
      videoUrl: [null, Validators.required],
      image: [null, Validators.required],
      phoneNumber: [null, Validators.required],
      role: [null, Validators.required],
      birthday: this.fb.group({
        day: [null, Validators.required],
        month: [null, Validators.required],
        year: [null, Validators.required]
      }),
      email: [null, Validators.required],
      title: [null, Validators.required],
      license: [null, Validators.required],
      realEstateLicense: [null, Validators.required],
      brokerLicense: [null, Validators.required]
    });
    // this.personalDetails.valueChanges.subscribe(x => {
    //   console.log(x);
    // });
  }
  switchSocialMediaLink(val: string): void{
    const layers = {facebook: false, instagram: false, linkedIn: false, twitter: false};
    this.socialMediaLinks = Object.assign(this.socialMediaLinks, layers, {
      [val]: true
    });
  }
  onSubmit(): void{
    console.log(this.personalDetails.value);
  }
}
