import { Component, OnInit } from '@angular/core';
import {HomeBuyingModel} from '../models/home-buying101.model';
import {DomSanitizer} from '@angular/platform-browser';

@Component({
  selector: 'app-home-buying101',
  templateUrl: './home-buying101.component.html',
  styleUrls: ['./home-buying101.component.scss']
})
export class HomeBuying101Component implements OnInit {
  home: HomeBuyingModel = {} as HomeBuyingModel;

  constructor(private sanitizer: DomSanitizer) {
  }

  ngOnInit(): void {
    this.home.article = {
      imageUrl: 'https://coralhomes.com.au/storage/app/uploads/public/5e8/2aa/088/thumb_21027_800_450_0_0_crop.jpg',
      content: 'Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical literature, discovered the undoubtable source. Lorem Ipsum comes from sections 1.10.32 and 1.10.33 of "de Finibus Bonorum et Malorum" (The Extremes of Good and Evil) by Cicero, written in 45 BC. This book is a treatise on the theory of ethics, very popular during the Renaissance. The first line of Lorem Ipsum, "Lorem ipsum dolor sit amet..", comes from a line in section 1.10.32Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical literature, discovered the undoubtable source. Lorem Ipsum comes from sections 1.10.32 and 1.10.33 of "de Finibus Bonorum et Malorum" (The Extremes of Good and Evil) by Cicero, written in 45 BC. This book is a treatise on the theory of ethics, very popular during the Renaissance. The first line of Lorem Ipsum, "Lorem ipsum dolor sit amet..", comes from a line in section 1.10.32',
      title: 'How Credit Works'
    };
    this.home.videoLibrary = [
      {
        videoUrl: 'https://www.youtube.com/embed/zpOULjyy-n8?rel=0',
        title: 'How Credit Works'
      },
      {
        videoUrl: 'https://www.youtube.com/embed/zpOULjyy-n8?rel=0',
        title: 'How Credit Works'
      },
      {
        videoUrl: 'https://www.youtube.com/embed/zpOULjyy-n8?rel=0',
        title: 'How Credit Works'
      },
      {
        videoUrl: 'https://www.youtube.com/embed/zpOULjyy-n8?rel=0',
        title: 'How Credit Works'
      },
      {
        videoUrl: 'https://www.youtube.com/embed/zpOULjyy-n8?rel=0',
        title: 'How Credit Works'
      },
      {
        videoUrl: 'https://www.youtube.com/embed/zpOULjyy-n8?rel=0',
        title: 'How Credit Works'
      },
      {
        videoUrl: 'https://www.youtube.com/embed/zpOULjyy-n8?rel=0',
        title: 'How Credit Works'
      },
      {
        videoUrl: 'https://www.youtube.com/embed/zpOULjyy-n8?rel=0',
        title: 'How Credit Works'
      },
    ];
    this.home.resources = [
      {resourceUrl: 'https://getbootstrap.com/docs/4.0/utilities/flex/', title: 'Bootstrap flex'},
      {resourceUrl: 'https://getbootstrap.com/docs/4.0/utilities/flex/', title: 'Bootstrap flex'},
      {resourceUrl: 'https://getbootstrap.com/docs/4.0/utilities/flex/', title: 'Bootstrap flex'},
      {resourceUrl: 'https://getbootstrap.com/docs/4.0/utilities/flex/', title: 'Bootstrap flex'},
      {resourceUrl: 'https://getbootstrap.com/docs/4.0/utilities/flex/', title: 'Bootstrap flex'},
      {resourceUrl: 'https://getbootstrap.com/docs/4.0/utilities/flex/', title: 'Bootstrap flex'},
      {resourceUrl: 'https://getbootstrap.com/docs/4.0/utilities/flex/', title: 'Bootstrap flex'},
      {resourceUrl: 'https://getbootstrap.com/docs/4.0/utilities/flex/', title: 'Bootstrap flex'},
      {resourceUrl: 'https://getbootstrap.com/docs/4.0/utilities/flex/', title: 'Bootstrap flex'},
      {resourceUrl: 'https://getbootstrap.com/docs/4.0/utilities/flex/', title: 'Bootstrap flex'},
      {resourceUrl: 'https://getbootstrap.com/docs/4.0/utilities/flex/', title: 'Bootstrap flex'},
      {resourceUrl: 'https://getbootstrap.com/docs/4.0/utilities/flex/', title: 'Bootstrap flex'},
      {resourceUrl: 'https://getbootstrap.com/docs/4.0/utilities/flex/', title: 'Bootstrap flex'},
      {resourceUrl: 'https://getbootstrap.com/docs/4.0/utilities/flex/', title: 'Bootstrap flex'},
      {resourceUrl: 'https://getbootstrap.com/docs/4.0/utilities/flex/', title: 'Bootstrap flex'},
      {resourceUrl: 'https://getbootstrap.com/docs/4.0/utilities/flex/', title: 'Bootstrap flex'},
      {resourceUrl: 'https://getbootstrap.com/docs/4.0/utilities/flex/', title: 'Bootstrap flex'},
      {resourceUrl: 'https://getbootstrap.com/docs/4.0/utilities/flex/', title: 'Bootstrap flex'},
      {resourceUrl: 'https://getbootstrap.com/docs/4.0/utilities/flex/', title: 'Bootstrap flex'},
      {resourceUrl: 'https://getbootstrap.com/docs/4.0/utilities/flex/', title: 'Bootstrap flex'},
      {resourceUrl: 'https://getbootstrap.com/docs/4.0/utilities/flex/', title: 'Bootstrap flex'},
      {resourceUrl: 'https://getbootstrap.com/docs/4.0/utilities/flex/', title: 'Bootstrap flex'},
      {resourceUrl: 'https://getbootstrap.com/docs/4.0/utilities/flex/', title: 'Bootstrap flex'},

    ];
  }

  safeUrl(value: string) {
    return this.sanitizer.bypassSecurityTrustResourceUrl(value);
  }


}
