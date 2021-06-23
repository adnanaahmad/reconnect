import {Subscription} from 'rxjs';

export interface PreApprovalTemplateModel{
    list: Array<TemplateModel>;
    currentTemplate: TemplateModel;
    otherDetails: any;
    subscription: Array<Subscription>;
    justTemplate: boolean;
    loanType: string;
}

export interface TemplateModel{
    title: string;
    description: string;
    body: string;
    conditions: Array<string>;
    closing: string;
    _id: string;
}

export interface ChangePreApprovalTemplateModel{
    list: Array<TemplateModel>;
    letter: any;
}
