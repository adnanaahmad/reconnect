import {Component, Input, OnInit} from '@angular/core';
import {HelperService} from '../../../../../../core/helper/helper.service';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-view-event',
  templateUrl: './view-event.component.html',
  styleUrls: ['./view-event.component.scss']
})
export class ViewEventComponent implements OnInit {
  @Input() view;
  constructor(private helper: HelperService, public activeModal: NgbActiveModal) { }

  ngOnInit(): void {
    this.helper.setModalPosition();
    //console.log(this.view);
  }
  close(): void{
    this.activeModal.close({status: 'no'});
  }
  edit(): void{
    this.activeModal.close({status: 'yes'});
  }
}
