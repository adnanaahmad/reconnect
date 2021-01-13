import {FormGroup} from '@angular/forms';

export interface RegistrationPartnerModel{
    screen: ScreenModel;
    role: Array<string>;
    token: string;
    states: Array<any>;
    cities: Array<any>;
    form: FormGroup;
}

interface ScreenModel{
    one: boolean;
    two: boolean;
    three: boolean;
}
