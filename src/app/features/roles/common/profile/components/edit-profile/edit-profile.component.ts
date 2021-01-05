import { Component, OnInit } from '@angular/core';
import {FormArray, FormBuilder, FormGroup, Validators} from '@angular/forms';
import { UserProfileEditModel } from '../../models/user-profile.model';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.scss']
})
export class EditProfileComponent implements OnInit {
  userProfile: UserProfileEditModel = {} as UserProfileEditModel;
  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
    this.setProfileData();

  }

  setProfileData(): void{
    this.userProfile.profileForm = this.fb.group({
      name: ['', Validators.required],
      image: ['', Validators.required],
      bio: ['', Validators.required],
      phone: ['', Validators.required],
      gender: ['', Validators.required],
      website: ['', Validators.required],
      birthday: this.fb.group({
        month: ['', Validators.required],
        day: ['', Validators.required],
        year: ['', Validators.required],
      }),
      email: ['', Validators.required],
      location: ['', Validators.required],
      address: new FormArray([])
    });
    // this.userProfile.profileForm.setValue({
    //   name: 'James Kanist',
    //   image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcQqkUYrITWyI8OhPNDHoCDUjGjhg8w10_HRqg&usqp=CAU',
    //   bio: 'American actor, producer, and musician. He is regarded as one of the most notable film stars.[1][2] He has been nominated for ten Golden',
    //   phone: '(+1) 444 333 789 345',
    //   gender: 'Male',
    //   website: 'www.google.com',
    //   birthday: {
    //     month: 'August',
    //     day: '03',
    //     year: '1992',
    //   },
    //   email: 'james@work.com',
    //   location: 'Vegas',
    //   address: [],
    // });
    // this.address.push(this.fb.control('11'));
    // this.address.push(this.fb.control('22'));
    // console.log(this.address);
    // console.log(this.userProfile.profileForm );
    // console.log(this.userProfile.profileForm.value);
  }

  onSubmit() {
    // TODO: Use EventEmitter with form value
    console.log(this.userProfile.profileForm.value);
  }
  get address(): FormArray {
    return this.userProfile.profileForm.controls.address as FormArray;
  }
  addAddress(): void {
    this.address.push(this.fb.control(''));
  }
}
