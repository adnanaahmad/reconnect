import { Component, OnInit } from '@angular/core';
import {DomSanitizer} from '@angular/platform-browser';
import {NewsFeedModel} from '../../models/news-feed.model';
import {DeleteConfirmationPopupComponent} from '../../../../../../shared/components/delete-confirmation-popup/delete-confirmation-popup.component';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {toInteger} from '@ng-bootstrap/ng-bootstrap/util/util';

@Component({
  selector: 'app-news-feed',
  templateUrl: './news-feed.component.html',
  styleUrls: ['./news-feed.component.scss']
})
export class NewsFeedComponent implements OnInit {
  newsFeed: NewsFeedModel = {} as NewsFeedModel;

  constructor(private sanitizer: DomSanitizer, private modalService: NgbModal) { }

  ngOnInit(): void {
    this.newsFeed.topNews = [
      {media: 'https://www.8homes.com.au/assets/media/homes/mode-4-28/facades/mobile_mode4-28_S3.jpg', title: 'QLD Home Designs Sekisui House Australia', time: '2'},
      {media: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ4OCdIEp61z8f0USNWSVmlLcsIJdzMaRy_Sg&usqp=CAU', title: 'Sekisui House Australia', time: '3'},
      {media: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTbzeKlW8Z10luM_53Gu45QFLfbQHjoB5wLYA&usqp=CAU', title: '67 Best Tiny Houses 2020 - Small House Pictures & Plans', time: '6'},
      {media: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTpDtEjboJygi3jsrDD4b1KwtSqWKrxEP8kTQ&usqp=CAU', title: 'Country Living Magazine', time: '8'},
    ];
    this.newsFeed.posts = [
      {userImage: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500', userName: 'James Hetfid', date:  new Date('2019-02-1'), title: 'Great New Home Video', description: 'You can choose a photo to set as your Gmail profile picture. This image shows up when You can choose a photo to set as your Gmail profile picture. This image shows up when You can choose a photo to set as your Gmail profile picture. This image shows up when', media: 'https://coralhomes.com.au/storage/app/uploads/public/5e8/2aa/088/thumb_21027_800_450_0_0_crop.jpg', type: 'image' },
   //   {userImage: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSGy7zDNfhP9qhfk5tguINYzwsE08fuD7c_nA&usqp=CAU', userName: 'Daniel Ho', date:  new Date('2019-05-16'), title: '3 Bedrooms Single Family House', description: 'You can choose a photo to set as your Gmail profile picture. This image shows up when', media: 'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/WhatCarCanYouGetForAGrand.mp4', type: 'video'},
   //   {userImage: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRgfO1Mq0Kcpp5TjqGOja-AnEFkpFLAav4R0g&usqp=CAU', userName: 'Trevor Noah', date:  new Date('2019-10-12'), title: 'Single Family House', description: 'You can choose a photo to set as your Gmail profile picture. This image shows up when You can choose a photo to set as your Gmail profile picture. This image shows up when You can choose a photo to set as your Gmail profile picture. This image shows up when You can choose a photo to set as your Gmail profile picture. This image shows up when', media: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSE2RS0_PJrJNS9lApW6g77mrBvYQHIt74nsw&usqp=CAU', type: 'image'},
   //   {userImage: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS6zes53m4a_2VLTcmTn_bHk8NO5SkuWfcQbg&usqp=CAU', userName: 'Marc Abd', date:  new Date('2019-11-15'), title: 'New Home 4 Bedrooms', description: 'You can choose a photo to set as your Gmail profile picture. This image shows up whenYou can choose a photo to set as your Gmail profile picture. This image shows up when', media: 'https://storage.googleapis.com/web-dev-assets/video-and-source-tags/chrome.webm', type: 'video'},
    ];
  }


  fileUpload(input: HTMLInputElement){

  }

  safeUrl(data) {
    return this.sanitizer.bypassSecurityTrustResourceUrl(data);
  }
  deletePost(index) {
    const modalRef = this.modalService.open(DeleteConfirmationPopupComponent);
    modalRef.result.then((result) => {
      if (result === 'Yes') {
        console.log(result);
        this.newsFeed.posts.splice(index, 1);
      }
    }, error => {
      //console.log(error);
    });
  }
  toggle(event): void{
    const element = event.target.closest('div.post-parent');
    //console.log(el);
    if (!element.children[0].style['-webkit-line-clamp'] || element.children[0].style['-webkit-line-clamp'] === '7'){
      element.children[0].style['-webkit-line-clamp'] = 10000;
      element.children[1].style.display = 'none';
      element.children[2].style.display = 'block';
    } else{
      element.children[0].style['-webkit-line-clamp'] = 7;
      element.children[1].style.display = 'block';
      element.children[2].style.display = 'none';
    }
    //console.log();
  }
  hideReadMore(id): boolean{
    return true;
  }
  //   const element = document.getElementById(id);
  //   const height = element.children[0].clientHeight;
  //   console.log(height);
  //   return (height >= 140);
  // }
}
