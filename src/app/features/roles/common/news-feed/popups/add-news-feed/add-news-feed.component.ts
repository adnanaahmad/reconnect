import { Component, OnInit } from '@angular/core';
import {HelperService} from '../../../../../../core/helper/helper.service';

@Component({
  selector: 'app-add-news-feed',
  templateUrl: './add-news-feed.component.html',
  styleUrls: ['./add-news-feed.component.scss']
})
export class AddNewsFeedComponent implements OnInit {

  constructor(private helper: HelperService) { }

  ngOnInit(): void {
    this.helper.setModalPosition();
  }
  close(): void{

  }
}
