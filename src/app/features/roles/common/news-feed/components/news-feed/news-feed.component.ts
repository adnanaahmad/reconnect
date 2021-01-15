import {Component, ElementRef, OnInit, QueryList, ViewChildren} from '@angular/core';
import {DomSanitizer} from '@angular/platform-browser';
import {NewsFeedModel} from '../../models/news-feed.model';
import {DeleteConfirmationPopupComponent} from '../../../../../../shared/components/delete-confirmation-popup/delete-confirmation-popup.component';
import { NgbModal, NgbModalConfig} from '@ng-bootstrap/ng-bootstrap';
import {AddNewsFeedComponent} from '../../popups/add-news-feed/add-news-feed.component';

@Component({
  selector: 'app-news-feed',
  templateUrl: './news-feed.component.html',
  styleUrls: ['./news-feed.component.scss']
})
export class NewsFeedComponent implements OnInit {
  newsFeed: NewsFeedModel = {} as NewsFeedModel;
  constructor(private sanitizer: DomSanitizer, private modalService: NgbModal, private config: NgbModalConfig) {
    config.animation = true;
    config.container = 'app-news-feed';
    config.centered = true;
  }

  ngOnInit(): void {
    this.newsFeed.topNews = [
      {media: 'https://www.8homes.com.au/assets/media/homes/mode-4-28/facades/mobile_mode4-28_S3.jpg', title: 'QLD Home Designs Sekisui House Australia', time: '2'},
      {media: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ4OCdIEp61z8f0USNWSVmlLcsIJdzMaRy_Sg&usqp=CAU', title: 'Sekisui House Australia', time: '3'},
      {media: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTbzeKlW8Z10luM_53Gu45QFLfbQHjoB5wLYA&usqp=CAU', title: '67 Best Tiny Houses 2020 - Small House Pictures & Plans', time: '6'},
      {media: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTpDtEjboJygi3jsrDD4b1KwtSqWKrxEP8kTQ&usqp=CAU', title: 'Country Living Magazine', time: '8'},
    ];
    this.newsFeed.posts = [
      {mediaArray: [
          {media: 'https://coralhomes.com.au/storage/app/uploads/public/5e8/2aa/088/thumb_21027_800_450_0_0_crop.jpg', type: 'image'},
          {media: 'https://www.8homes.com.au/assets/media/homes/mode-4-28/facades/mobile_mode4-28_S3.jpg', type: 'image'},
          {media: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTbzeKlW8Z10luM_53Gu45QFLfbQHjoB5wLYA&usqp=CAU', type: 'image'},
          {media: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTpDtEjboJygi3jsrDD4b1KwtSqWKrxEP8kTQ&usqp=CAU', type: 'image'},
          {media: 'https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/brewster-mcleod-architects-1486154143.jpg', type: 'image'},
          {media: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSZO_5-GQTzECUuQbuCD-H6kBuga_gbPqZZf6j-P2ZI90yZLQX5y2r_bZBr4m2lHJr_IZMGdFVpRPTxMB9LzmPwsmNyBDYvBrfeXg&usqp=CAU&ec=45761792'}], userImage: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500', userName: 'James Hetfid', date:  new Date('2019-02-1'), title: 'Great New Home Video', description: 'You can choose a photo to set as your Gmail profile picture.et as your Gmail profile picture.et as your Gmail profile picture.et as your Gmail profile picture.et as your Gmail profile picture.et as your Gmail profile picture.et as your Gmail profile picture.et as your Gmail profile picture.et as your Gmail profile picture.et as your Gmail profile picture. This image shows up when You can choose a photo to set as your Gmail profile picture. This image shows up when You can choose a photo to set as your Gmail profile picture. This image shows up when'}

          ];
  }

  safeUrl(data) {
    return this.sanitizer.bypassSecurityTrustResourceUrl(data);
  }
  deletePost(index): void {
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
  addNewsFeed(): void {
      const modalRef = this.modalService.open(AddNewsFeedComponent);
      modalRef.result.then((result) => {
          if (result === 'Yes') {
              console.log(result);
          }
      }, error => {
          //console.log(error);
      });
  }
}
