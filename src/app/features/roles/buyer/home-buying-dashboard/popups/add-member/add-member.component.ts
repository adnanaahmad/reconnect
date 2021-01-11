import {Component, Input, OnInit} from '@angular/core';
import {HelperService} from '../../../../../../core/helper/helper.service';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-add-member',
  templateUrl: './add-member.component.html',
  styleUrls: ['./add-member.component.scss']
})
export class AddMemberComponent implements OnInit {
  @Input() role;
  public members: any;
  constructor(private helper: HelperService, public modal: NgbActiveModal,) { }

  ngOnInit(): void {
    this.helper.setModalPosition();
    console.log(this.role);
    switch (this.role) {
      case 'Real Estate Agent':
        this.members = [
          {rating: 5,
            reviews: 1500,
            image: 'https://img-cdn.tid.al/o/4858a4b2723b7d0c7d05584ff57701f7b0c54ce3.jpg',
            name: 'Daniel Kevin', role: 'Real Estate Agent',
            number: '+923 24 4 1276',
            socialMedia: {
              facebook: 'https://www.google.com/',
              instagram: 'https://www.google.com/',
              linkedin: 'https://www.google.com/',
              twitter: 'https://www.google.com/',
              world: 'https://www.google.com/'
          }},
          {rating: 5, reviews: 1500, image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRHPzYd8Zq8A3IXMaeSeTyfaSTce2CLi0NZ-Q&usqp=CAU', name: 'Tom Holland', role: 'Real Estate Agent', number: '+923 24 4 1276', socialMedia: {facebook: 'https://www.google.com/', instagram: 'https://www.google.com/', linkedin: 'https://www.google.com/', twitter: 'https://www.google.com/', world: 'https://www.google.com/'}},
          {rating: 5, reviews: 1500, image: 'https://alicepropertymanagement.com/images/temp-profile.jpg', name: 'Sean Paul', role: 'Real Estate Agent', number: '+923 24 4 1276', socialMedia: {facebook: 'https://www.google.com/', instagram: 'https://www.google.com/', linkedin: 'https://www.google.com/', twitter: 'https://www.google.com/', world: 'https://www.google.com/'}},
    ];
        break;
      case 'Lender':
        this.members = [
          {rating: 5,
            reviews: 1500,
            image: 'https://img-cdn.tid.al/o/4858a4b2723b7d0c7d05584ff57701f7b0c54ce3.jpg',
            name: 'Daniel Kevin', role: 'Lender',
            number: '+923 24 4 1276',
            socialMedia: {
              facebook: 'https://www.google.com/',
              instagram: 'https://www.google.com/',
              linkedin: 'https://www.google.com/',
              twitter: 'https://www.google.com/',
              world: 'https://www.google.com/'
            }},
          {rating: 5, reviews: 1500, image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRHPzYd8Zq8A3IXMaeSeTyfaSTce2CLi0NZ-Q&usqp=CAU', name: 'Tom Holland', role: 'Lender', number: '+923 24 4 1276', socialMedia: {facebook: 'https://www.google.com/', instagram: 'https://www.google.com/', linkedin: 'https://www.google.com/', twitter: 'https://www.google.com/', world: 'https://www.google.com/'}},
          {rating: 5, reviews: 1500, image: 'https://alicepropertymanagement.com/images/temp-profile.jpg', name: 'Sean Paul', role: 'Lender', number: '+923 24 4 1276', socialMedia: {facebook: 'https://www.google.com/', instagram: 'https://www.google.com/', linkedin: 'https://www.google.com/', twitter: 'https://www.google.com/', world: 'https://www.google.com/'}},
        ];
        break;
      case 'Attorney':
        this.members = [
          {rating: 5,
            reviews: 1500,
            image: 'https://img-cdn.tid.al/o/4858a4b2723b7d0c7d05584ff57701f7b0c54ce3.jpg',
            name: 'Daniel Kevin', role: 'Attorney',
            number: '+923 24 4 1276',
            socialMedia: {
              facebook: 'https://www.google.com/',
              instagram: 'https://www.google.com/',
              linkedin: 'https://www.google.com/',
              twitter: 'https://www.google.com/',
              world: 'https://www.google.com/'
            }},
          {rating: 5, reviews: 1500, image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRHPzYd8Zq8A3IXMaeSeTyfaSTce2CLi0NZ-Q&usqp=CAU', name: 'Tom Holland', role: 'Attorney', number: '+923 24 4 1276', socialMedia: {facebook: 'https://www.google.com/', instagram: 'https://www.google.com/', linkedin: 'https://www.google.com/', twitter: 'https://www.google.com/', world: 'https://www.google.com/'}},
          {rating: 5, reviews: 1500, image: 'https://alicepropertymanagement.com/images/temp-profile.jpg', name: 'Sean Paul', role: 'Attorney', number: '+923 24 4 1276', socialMedia: {facebook: 'https://www.google.com/', instagram: 'https://www.google.com/', linkedin: 'https://www.google.com/', twitter: 'https://www.google.com/', world: 'https://www.google.com/'}},
        ];
        break;
      case 'Home Inspector':
        this.members = [
          {rating: 5,
            reviews: 1500,
            image: 'https://img-cdn.tid.al/o/4858a4b2723b7d0c7d05584ff57701f7b0c54ce3.jpg',
            name: 'Daniel Kevin', role: 'Home Inspector',
            number: '+923 24 4 1276',
            socialMedia: {
              facebook: 'https://www.google.com/',
              instagram: 'https://www.google.com/',
              linkedin: 'https://www.google.com/',
              twitter: 'https://www.google.com/',
              world: 'https://www.google.com/'
            }},
          {rating: 5, reviews: 1500, image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRHPzYd8Zq8A3IXMaeSeTyfaSTce2CLi0NZ-Q&usqp=CAU', name: 'Tom Holland', role: 'Home Inspector', number: '+923 24 4 1276', socialMedia: {facebook: 'https://www.google.com/', instagram: 'https://www.google.com/', linkedin: 'https://www.google.com/', twitter: 'https://www.google.com/', world: 'https://www.google.com/'}},
          {rating: 5, reviews: 1500, image: 'https://alicepropertymanagement.com/images/temp-profile.jpg', name: 'Sean Paul', role: 'Home Inspector', number: '+923 24 4 1276', socialMedia: {facebook: 'https://www.google.com/', instagram: 'https://www.google.com/', linkedin: 'https://www.google.com/', twitter: 'https://www.google.com/', world: 'https://www.google.com/'}},
        ];
        break;
      case 'Insurance Agent':
        this.members = [
          {rating: 5,
            reviews: 1500,
            image: 'https://img-cdn.tid.al/o/4858a4b2723b7d0c7d05584ff57701f7b0c54ce3.jpg',
            name: 'Daniel Kevin', role: 'Insurance Agent',
            number: '+923 24 4 1276',
            socialMedia: {
              facebook: 'https://www.google.com/',
              instagram: 'https://www.google.com/',
              linkedin: 'https://www.google.com/',
              twitter: 'https://www.google.com/',
              world: 'https://www.google.com/'
            }},
          {rating: 5, reviews: 1500, image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRHPzYd8Zq8A3IXMaeSeTyfaSTce2CLi0NZ-Q&usqp=CAU', name: 'Tom Holland', role: 'Insurance Agent', number: '+923 24 4 1276', socialMedia: {facebook: 'https://www.google.com/', instagram: 'https://www.google.com/', linkedin: 'https://www.google.com/', twitter: 'https://www.google.com/', world: 'https://www.google.com/'}},
          {rating: 5, reviews: 1500, image: 'https://alicepropertymanagement.com/images/temp-profile.jpg', name: 'Sean Paul', role: 'Insurance Agent', number: '+923 24 4 1276', socialMedia: {facebook: 'https://www.google.com/', instagram: 'https://www.google.com/', linkedin: 'https://www.google.com/', twitter: 'https://www.google.com/', world: 'https://www.google.com/'}},
        ];
        break;
       default:
          console.log();
    }
  }
  addMember(member): void{
    this.modal.close({status: 'yes', data: member});
  }
}
