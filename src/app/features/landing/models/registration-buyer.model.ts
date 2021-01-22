import {FormControl, FormGroup} from '@angular/forms';

export interface RegistrationBuyerModel{
    screen: ScreenModel;
    professional: Array<any>;
    aboutUs: {};
    referral: boolean;
    other: boolean;
    form: FormGroup;
    agreed: FormControl;
}
interface ScreenModel{
    one: boolean;
    two: boolean;
    three: boolean;
}
