import {Component, EventEmitter, Input, OnDestroy, OnInit, Output} from '@angular/core';
import {TemplateModel} from '../../models/pre-approval-template.model';
import {ActivatedRoute} from '@angular/router';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-template-list',
  templateUrl: './template-list.component.html',
  styleUrls: ['./template-list.component.scss']
})
export class TemplateListComponent implements OnInit, OnDestroy {
  @Output() createNewTemplate =  new EventEmitter<any>();
  @Output() remove =  new EventEmitter<any>();
  @Output() edit =  new EventEmitter<any>();
  @Input() templateList: Array<TemplateModel>;
  subscription: Array<Subscription>;
  activeButton: string;
  constructor(private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.subscription = [];
    this.subscription.push(
        this.activatedRoute.queryParams.subscribe(params => {
            if (params.templateId) {
              this.activeButton = params.templateId;
            }
        })
    );
  }
  ngOnDestroy(): void {
    this.subscription.forEach(x => x.unsubscribe());
  }
}
