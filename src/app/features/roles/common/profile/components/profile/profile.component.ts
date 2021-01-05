import { Component, OnInit } from '@angular/core';
import { UserProfileModel} from '../../models/user-profile.model';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  userProfile: UserProfileModel = {} as UserProfileModel;
  constructor() { }

  ngOnInit(): void {
    this.userProfile = {
      name: 'James Kanist',
      image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcQqkUYrITWyI8OhPNDHoCDUjGjhg8w10_HRqg&usqp=CAU',
      role: 'Buyer',
      bio: 'American actor, producer, and musician. He is regarded as one of the most notable film stars.[1][2] He has been nominated for ten Golden',
      phone: '(+1) 444 333 789 345',
      gender: 'male',
      website: 'www.google.com',
      birthday: new Date('2019-01-16'),
      email: 'james@work.com',
      location: 'LA',
      address: '30 Aulike St. Suite 105 Kailua, United States of America 96734',
    };
  }

}
