import { Component, OnInit } from '@angular/core';
import {HelperService} from '../../../../../../core/helper/helper.service';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-add-news-feed',
  templateUrl: './add-news-feed.component.html',
  styleUrls: ['./add-news-feed.component.scss']
})
export class AddNewsFeedComponent implements OnInit {

  constructor(private helper: HelperService, private modal: NgbActiveModal) { }

  ngOnInit(): void {
    this.helper.setModalPosition();
  }
  close(): void{
    this.modal.dismiss();
  }
}
