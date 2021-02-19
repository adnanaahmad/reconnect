import {FormGroup} from '@angular/forms';

export interface SetPasswordModel{
    form: FormGroup;
    firstName: string;
    lastName: string;
    token: string;
    resetPassword: boolean;
}
