import {FormControl, FormGroup} from '@angular/forms';

export interface RegistrationPartnerModel{
    screen: ScreenModel;
    role: {};
    token: string;
    states: Array<any>;
    cities: Array<any>;
    form: FormGroup;
    roleFormControl: FormControl;
}

interface ScreenModel{
    one: boolean;
    two: boolean;
    three: boolean;
    four: boolean;
}
