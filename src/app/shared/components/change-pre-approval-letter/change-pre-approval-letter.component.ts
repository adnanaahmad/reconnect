import {Component, Input, OnInit} from '@angular/core';
import {HelperService} from '../../../core/helper/helper.service';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {PreApprovalLetterService} from '../../../features/roles/common/pre-approval-letter/services/pre-approval-letter.service';
import {take} from 'rxjs/operators';
import {ChangePreApprovalTemplateModel} from '../../../features/roles/common/pre-approval-letter/models/pre-approval-template.model';
import {Router} from '@angular/router';
import {ToastrService} from 'ngx-toastr';

@Component({
  selector: 'app-change-pre-approval-letter',
  templateUrl: './change-pre-approval-letter.component.html',
  styleUrls: ['./change-pre-approval-letter.component.scss']
})
export class ChangePreApprovalLetterComponent implements OnInit {
  @Input() data: { borrowerId: string; loanType: string, mlsId: number};
  template: ChangePreApprovalTemplateModel;
  constructor(private helper: HelperService,
              private activeModal: NgbActiveModal,
              private preApprovalService: PreApprovalLetterService,
              private toaster: ToastrService) { }

  ngOnInit(): void {
    this.helper.setModalPosition();
    this.template = {} as ChangePreApprovalTemplateModel;
    this.getTemplateList();
  }
  close(): void{
    this.activeModal.close({status: 'no'});
  }
  getTemplateList(): void{
    this.preApprovalService.getTemplateList(`?borrowerId=${this.data.borrowerId}&loanType=${this.data.loanType}`)
        .pipe(take(1)).subscribe(res => {
          this.template.list = res.result.templates;
          this.template.letter = res.result.selectedTemplates[this.data.loanType];
    }, error => {
      this.helper.handleApiError(error, 'Failed to fetch list');
    });
  }
  select(id): void{
    this.template.letter = id;
  }
  onSubmit(): void{
    const data = {};
    if (this.template.letter){
      data[this.data.loanType] = this.template.letter;
      this.preApprovalService.updateTemplateId(data, this.data.borrowerId)
          .pipe(take(1)).subscribe(res => {
        this.activeModal.close({status: 'no'});
      }, error => {
        this.helper.handleApiError(error, 'Failed to fetch list');
      });
    } else {
      this.toaster.error('Choose template');
    }
  }
}
