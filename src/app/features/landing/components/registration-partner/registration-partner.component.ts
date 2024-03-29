import { Component, OnInit } from '@angular/core';
import {LocationService} from '../../services/location/location.service';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {RegistrationPartnerModel} from '../../models/registration-partner.model';
import {AuthService} from '../../services/auth/auth.service';
import {ConstantService} from '../../../../core/constant/constant.service';
import {HelperService} from '../../../../core/helper/helper.service';
import {take} from 'rxjs/operators';
import {ToastrService} from 'ngx-toastr';

@Component({
  selector: 'app-registration-partner',
  templateUrl: './registration-partner.component.html',
  styleUrls: ['./registration-partner.component.scss']
})
export class RegistrationPartnerComponent implements OnInit {
  register: RegistrationPartnerModel = {} as RegistrationPartnerModel;
  constructor(private location: LocationService,
              private fb: FormBuilder,
              private auth: AuthService,
              private constant: ConstantService,
              public helper: HelperService,
              private toaster: ToastrService) { }

  ngOnInit(): void {
    this.register.roleFormControl = new FormControl(null);
    this.register.screen = {one: true, two: false, three: false, four: false};
    this.register.role = this.constant.chooseRole;
    this.location.getStates().pipe(take(1)).subscribe(response => {
      response = response.sort((a, b) => {
        if (a.name < b.name) { return -1; }
        if (a.name > b.name) { return 1; }
        return 0;
      });
      this.register.states = response;
    });
    this.register.form = this.fb.group({
      company: this.fb.group({
        name: [null, [Validators.required, Validators.pattern('^((?![\\^!@#$*~ <>?]).)((?![\\^!@#$*~<>?]).){0,73}((?![\\^!@#$*~ <>?]).)$'), Validators.minLength(2), Validators.maxLength(50)]],
        licenseNumber: [null, [Validators.required, Validators.maxLength(16), Validators.pattern('^[a-zA-Z0-9]+$')]],
        phoneNumber: [null, [Validators.required, Validators.pattern('^\\d{10}$')]],
        city: [null, Validators.required],
        street: [null, [Validators.required, Validators.maxLength(150), Validators.pattern('^((?![\\^ ]).)((?![\\^]).){0,73}((?![\\^ ]).)$')]],
        state: [null, Validators.required],
        zip: [null, [Validators.required, Validators.pattern('^[0-9]{1,5}$')]],
      }),
      personal: this.fb.group({
        role: [null, Validators.required],
        firstName: [null, [Validators.required, Validators.minLength(2), Validators.maxLength(30), Validators.pattern('^(?! )[A-Za-z ]*(?<! )$')]],
        lastName: [null, [Validators.required, Validators.minLength(2), Validators.maxLength(30), Validators.pattern('^(?! )[A-Za-z ]*(?<! )$')]],
        nmlsNumber: [null, [Validators.required, Validators.pattern('^[a-zA-Z0-9]+$')]],
        realEstateLicenseNumber: [null, [Validators.required, Validators.maxLength(16), Validators.pattern('^[a-zA-Z0-9]+$')]],
        phoneNumber: [null, [Validators.required, Validators.pattern('^\\d{10}$')]],
        email: [null, [Validators.required, Validators.pattern('^(([^<>()[\\]\\\\.,;:\\s@\\"]+(\\.[^<>()[\\]\\\\.,;:\\s@\\"]+)*)|(\\".+\\"))@((\\[[0-9]{1,3}\\.[0-9]{1,3}\\.[0-9]{1,3}\\.[0-9]{1,3}\\])|(([a-zA-Z\\-0-9]+\\.)+[a-zA-Z]{2,}))$')]],
      }),
      agreed: [null, Validators.required]
    });
    //this.register.form.valueChanges.subscribe(x => console.log(x));
  }

  changeState(state): void{
    this.location.getCities(state).pipe(take(1)).subscribe(res => {
      this.register.cities = res;
    });
  }
  onSubmit(): void{
    if ((!this.register.form.get('personal').valid) || !this.register.form.get('agreed').value){
      this.register.form.get('personal').markAllAsTouched();
      this.register.form.get('agreed').markAllAsTouched();
    } else {
      const data = {... this.register.form.get('personal').value, ...{company: this.register.form.get('company').value}};
      console.log(data);
      this.auth.signUp(data).pipe(take(1)).subscribe(res => {
        console.log(res);
        if (res.result.user.accountStatus === 'pendingApproval'){
          this.register.screen.three = false;
          this.register.screen.four = true;
        }
      }, error => {
        if (error.error.result.CODE === 'BAD_REQUEST'){
          this.toaster.error(error.error.result.details.MESSAGE);
        } else {
          this.toaster.error(error.error.result.MESSAGE);
        }
      });
    }
  }
  proceedToScreenThree(): void{
    if (!this.register.form.get('company').valid){
      this.register.form.get('company').markAllAsTouched();
    } else {
      this.register.screen.two = false;
      this.register.screen.three = true;
    }
  }
  proceedToScreenTwo(): void{
    if (!this.register.form.get('personal.role').valid){
      this.register.form.get(['personal', 'role']).markAllAsTouched();
    } else {
      this.register.screen['one'] = false;
      this.register.screen['two'] = true;
      switch (this.register.form.get(['personal', 'role']).value){
        case this.constant.role.REAL_ESTATE:
          this.register.form.get(['personal', 'realEstateLicenseNumber']).enable();
          this.register.form.get(['company', 'licenseNumber']).enable();
          this.register.form.get(['personal', 'nmlsNumber']).disable();
          this.register.form.get(['company', 'street']).setValidators([Validators.required, Validators.maxLength(150), Validators.pattern('^((?![\\^ ]).)((?![\\^]).){0,73}((?![\\^ ]).)$')]);
          this.register.form.get(['company', 'zip']).setValidators([Validators.required, Validators.pattern('^[0-9]{1,5}$')]);
          break;
        case this.constant.role.LENDER:
          this.register.form.get(['personal', 'nmlsNumber']).enable();
          this.register.form.get(['company', 'licenseNumber']).enable();
          this.register.form.get(['personal', 'realEstateLicenseNumber']).disable();
          this.register.form.get(['company', 'street']).setValidators([Validators.required, Validators.maxLength(150), Validators.pattern('^((?![\\^ ]).)((?![\\^]).){0,73}((?![\\^ ]).)$')]);
          this.register.form.get(['company', 'zip']).setValidators([Validators.required, Validators.pattern('^[0-9]{1,5}$')]);
          break;
        case this.constant.role.ATTORNEY:
          this.register.form.get(['personal', 'nmlsNumber']).disable();
          this.register.form.get(['personal', 'realEstateLicenseNumber']).disable();
          this.register.form.get(['company', 'licenseNumber']).disable();
          this.register.form.get(['company', 'street']).setValidators([Validators.required, Validators.maxLength(150), Validators.pattern('^((?![\\^ ]).)((?![\\^]).){0,73}((?![\\^ ]).)$')]);
          this.register.form.get(['company', 'zip']).setValidators([Validators.required, Validators.pattern('^[0-9]{1,5}$')]);
          break;
        case this.constant.role.HOME_INSPECTOR:
          this.register.form.get(['personal', 'nmlsNumber']).disable();
          this.register.form.get(['personal', 'realEstateLicenseNumber']).disable();
          this.register.form.get(['company', 'licenseNumber']).disable();
          this.register.form.get(['company', 'street']).clearValidators();
          this.register.form.get(['company', 'zip']).clearValidators();
          break;
        case this.constant.role.INSURANCE:
          this.register.form.get(['personal', 'nmlsNumber']).disable();
          this.register.form.get(['personal', 'realEstateLicenseNumber']).disable();
          this.register.form.get(['company', 'licenseNumber']).disable();
          this.register.form.get(['company', 'street']).setValidators([Validators.required, Validators.maxLength(150), Validators.pattern('^((?![\\^ ]).)((?![\\^]).){0,73}((?![\\^ ]).)$')]);
          this.register.form.get(['company', 'zip']).setValidators([Validators.required, Validators.pattern('^[0-9]{1,5}$')]);
          break;
        default:
          break;
      }
    }
  }
}
