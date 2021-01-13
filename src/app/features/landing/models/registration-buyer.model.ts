import {FormGroup} from '@angular/forms';

export interface RegistrationBuyerModel{
    screen: ScreenModel;
    professional: Array<any>;
    aboutUs: Array<string>;
    referral: boolean;
    form: FormGroup;
}
interface ScreenModel{
    one: boolean;
    two: boolean;
    three: boolean;
}
