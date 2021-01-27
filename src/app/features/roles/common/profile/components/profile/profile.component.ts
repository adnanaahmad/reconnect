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
  userProfilePro: any;
  constructor(public store: StoreService, public router: Router) { }

  ngOnInit(): void {
    // this.userProfile = {
    //   name: 'James Kanist',
    //   image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcQqkUYrITWyI8OhPNDHoCDUjGjhg8w10_HRqg&usqp=CAU',
    //   role: 'Buyer',
    //   bio: 'American actor, producer, and musician. He is regarded as one of the most notable film stars.[1][2] He has been nominated for ten Golden',
    //   phone: '(+1) 444 333 789 345',
    //   gender: 'male',
    //   website: 'www.google.com',
    //   birthday: new Date('2019-01-16'),
    //   email: 'james@work.com',
    //   location: 'LA',
    //   address: '30 Aulike St. Suite 105 Kailua, United States of America 96734',
    // };
    this.userProfilePro = {
      personal: {
        firstName: 'James',
        lastName: 'Kanist',
        image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcQqkUYrITWyI8OhPNDHoCDUjGjhg8w10_HRqg&usqp=CAU',
        role: 'Buyer',
        bio: 'American actor, producer, and musician. He is regarded as one of the most notable film stars.[1][2] He has been nominated for ten Golden',
        video: 'https://www.youtube.com/embed/zpOULjyy-n8?rel=0',
        socialMedia: {
          facebook: 'https://www.google.com/',
          instagram: 'https://www.google.com/',
          linkedin: 'https://www.google.com/',
          twitter: 'https://www.google.com/',
          },
        phone: '(+1) 444 333 789 345',
        birthday: new Date('2019-01-16'),
        email: 'james@work.com',
        license: 123456,
        realEstateLic: 323223,
        brokerLic: 8645645
      },
      company: {
        image: 'https://99designs-blog.imgix.net/blog/wp-content/uploads/2018/01/attachment_64698719-1-e1515600775291.png?auto=format&q=60&fit=max&w=930',
        name: 'RealTech',
        officePhone: '(+1) 444 333 789 345',
        faxPhone: '(+1) 444 333 789 345',
        address: '30 Aulike St. Suite 105 Kailua, United States of America 96734',
        license: 466677,
      }
    };
  }
  editProfile(): void{
    this.store.role.subscribe(res => {
      if (res === 'buyer'){
        this.router.navigateByUrl('/home/profile/editDetails');
      } else {
        this.router.navigateByUrl('/home/profile/edit/personalDetails');
      }
    })
  }

}
