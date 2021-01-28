import {FormGroup} from '@angular/forms';

export interface CompanyDetailsModel{
    form: FormGroup;
    cities: Array<any>;
    states: Array<any>;
    image: string;
    fileUpload: string;
}
