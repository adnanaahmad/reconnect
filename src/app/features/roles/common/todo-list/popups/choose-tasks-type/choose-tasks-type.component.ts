import { Component, OnInit } from '@angular/core';
import {HelperService} from '../../../../../../core/helper/helper.service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {take} from 'rxjs/operators';
import {ToastrService} from 'ngx-toastr';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-choose-tasks-type',
  templateUrl: './choose-tasks-type.component.html',
  styleUrls: ['./choose-tasks-type.component.scss']
})
export class ChooseTasksTypeComponent implements OnInit {
  task: FormGroup;
  constructor(private helper: HelperService,
              private fb: FormBuilder,
              private activeModal: NgbActiveModal,) { }

  ngOnInit(): void {
    this.helper.setModalPosition();
    this.task = this.fb.group({
      type: ['simple', Validators.required]
    });
  }
  close(): void{
    this.activeModal.close({status: 'no'});
  }
  onSubmit(): void{
    if (this.task.get('type').value === 'simple') {
      this.activeModal.close({status: 'simple'});
    } else {
      this.activeModal.close({status: 'event'});
    }
  }

}
