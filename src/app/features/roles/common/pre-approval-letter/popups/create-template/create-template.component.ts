import { Component, OnInit } from '@angular/core';
import {HelperService} from '../../../../../../core/helper/helper.service';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {PreApprovalLetterService} from '../../services/pre-approval-letter.service';
import {take} from 'rxjs/operators';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-create-template',
  templateUrl: './create-template.component.html',
  styleUrls: ['./create-template.component.scss']
})
export class CreateTemplateComponent implements OnInit {
  template: FormGroup;
  constructor(private helper: HelperService,
              private activeModal: NgbActiveModal,
              private preApprovalService: PreApprovalLetterService,
              private fb: FormBuilder) { }

  ngOnInit(): void {
    this.helper.setModalPosition();
    this.template = this.fb.group({
      title: [null, Validators.required],
      description: [null, Validators.required],
      body: [''],
      conditions: [[]],
      closing: ['']
    });
  }
  close(): void{
    this.activeModal.close({status: 'no'});
  }
  onSubmit(): void{
    this.preApprovalService.createTemplate(this.template.value).pipe(take(1)).subscribe(res => {
      this.activeModal.close({status: 'yes', data: res.result});
    }, error => {
      this.helper.handleApiError(error, 'Failed to create template');
    });
  }
}
