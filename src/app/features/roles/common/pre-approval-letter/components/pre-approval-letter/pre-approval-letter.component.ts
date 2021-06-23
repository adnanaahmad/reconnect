import {Component, OnDestroy, OnInit} from '@angular/core';
import {NgbModal, NgbModalConfig} from '@ng-bootstrap/ng-bootstrap';
import {CreateTemplateComponent} from '../../popups/create-template/create-template.component';
import {take} from 'rxjs/operators';
import {PreApprovalLetterService} from '../../services/pre-approval-letter.service';
import {HelperService} from '../../../../../../core/helper/helper.service';
import {PreApprovalTemplateModel} from '../../models/pre-approval-template.model';
import {ToastrService} from 'ngx-toastr';
import {forkJoin} from 'rxjs';
import {ActivatedRoute} from '@angular/router';
import {StoreService} from '../../../../../../core/store/store.service';

@Component({
  selector: 'app-pre-approval-letter',
  templateUrl: './pre-approval-letter.component.html',
  styleUrls: ['./pre-approval-letter.component.scss']
})
export class PreApprovalLetterComponent implements OnInit, OnDestroy {
  template: PreApprovalTemplateModel;
  constructor(private modalService: NgbModal,
              private configuration: NgbModalConfig,
              private preApprovalService: PreApprovalLetterService,
              private helper: HelperService,
              private toaster: ToastrService,
              private activatedRoute: ActivatedRoute,
              public store: StoreService) {
    configuration.centered = true;
    configuration.container = 'app-pre-approval-letter';
  }

  ngOnInit(): void {
    this.template = {} as PreApprovalTemplateModel;
    this.template.subscription = [];
    this.template.subscription.push(
        this.activatedRoute.queryParams.subscribe(params => {
          if (params.mlsId && params.borrowerId && params.templateId && params.loanType) {
            this.template.justTemplate = false;
            this.getLetterInfo(params);
          } else if (params.templateId) {
            this.template.justTemplate = true;
            this.getTemplates(true, params.templateId);
          } else {
            this.template.justTemplate = true;
            this.getTemplates(false);
          }
        })
    );
  }
  ngOnDestroy(): void {
    this.template.subscription.forEach(x => x.unsubscribe());
  }

  createTemplate(): void{
    const modalRef = this.modalService.open(CreateTemplateComponent);
    modalRef.result.then((result) => {
      if (result.status === 'yes') {
          this.template.list.push(result.data);
      }
    }, error => {
      console.log(error);
    });
  }
  removeTemplate(data): void{
    this.preApprovalService.removeTemplate(data.id).pipe(take(1)).subscribe(res => {
      this.toaster.success('Template removed successfully');
      this.template.list.splice(data.index, 1);
      if (this.template.currentTemplate && (this.template.currentTemplate ? this.template.currentTemplate._id === data.id : false)){
        this.template.currentTemplate = null;
      }
    }, error => {
      this.helper.handleApiError(error, 'Failed to fetch templates');
    });
  }
  getTemplates(templateBoolean, id?): void{
    this.store.updateProgressBarLoading(true);
    this.preApprovalService.getTemplates().pipe(take(1)).subscribe(res => {
      this.template.list = res.result.templates;
      this.template.currentTemplate = null;
      if (templateBoolean){
        const index = this.template.list.findIndex(x => x._id === id);
        this.template.currentTemplate = this.template.list[index];
      }
      this.store.updateProgressBarLoading(false);
    }, error => {
      this.helper.handleApiError(error, 'Failed to fetch templates');
      this.store.updateProgressBarLoading(false);
    });
  }
  editTemplate(template): void{
    this.template.currentTemplate = template.data;
    this.template.justTemplate = true;
    window.history.replaceState({}, '', `/home/preApprovalLetter?templateId=${template.data._id}`);

  }
  update(data): void{
    const index = this.template.list.findIndex(x => x._id === data._id);
    this.template.list[index] = data;
  }
  getLetterInfo(data): void{
    this.store.updateProgressBarLoading(true);
    forkJoin([this.preApprovalService.getTemplates(),
      this.preApprovalService.getPropertyDetails(`${data.mlsId}&buyerId=${data.borrowerId}`)]).pipe(take(1)).subscribe(res => {
      this.template.list = res[0].result.templates;
      const index = this.template.list.findIndex(x => x._id === data.templateId);
      this.template.currentTemplate = this.template.list[index];
      this.template.otherDetails = res[1].result;
      this.template.loanType = data.loanType;
      this.store.updateProgressBarLoading(false);
    }, error => {
      this.helper.handleApiError(error, 'Failed to fetch details');
      this.store.updateProgressBarLoading(false);
    });
  }
}
