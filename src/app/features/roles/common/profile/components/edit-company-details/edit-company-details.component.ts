import { Component, OnInit } from '@angular/core';
import {FormBuilder, Validators} from '@angular/forms';
import {ProfileService} from '../../services/profile.service';
import {CompanyDetailsModel} from '../../models/company-details.model';
import {HelperService} from '../../../../../../core/helper/helper.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-edit-company-details',
  templateUrl: './edit-company-details.component.html',
  styleUrls: ['./edit-company-details.component.scss']
})
export class EditCompanyDetailsComponent implements OnInit {
  companyDetails: CompanyDetailsModel = {} as CompanyDetailsModel;
  loader = false;
  constructor(private fb: FormBuilder,
              private profile: ProfileService,
              private helper: HelperService,
              private router: Router) { }

  ngOnInit(): void {
    this.getLocation();
    this.initialiseCompanyForm();
    this.setCompanyData();
  }
  onSubmit(): void{
    console.log(this.companyDetails.form.value);
    if (this.companyDetails.fileUpload){
      this.profile.uploadCompanyPicture(this.companyDetails.fileUpload).subscribe(res => {
         console.log(res);
      }, error => {
        console.log(error);
      });
    }
    this.profile.saveProfile({company: this.companyDetails.form.value}).subscribe(res => {
      // console.log(res);
      this.router.navigateByUrl('/home/profile').then();
      console.log(res);
    }, error => {
      console.log(error);
    });
  }
  initialiseCompanyForm(): void{
    this.companyDetails.form = this.fb.group({
      name: [null, Validators.required],
      licenseNumber: [null, Validators.required],
      phoneNumber: [null, Validators.required],
      faxNumber: [null, Validators.required],
      street: [null, Validators.required],
      city: [null, Validators.required],
      state: [null, Validators.required],
      zip: [null, Validators.required],
    });
  }
  setCompanyData(): void{
    this.profile.getUserData().subscribe(res => {
      res = res.result.company;
      this.setCity(res.state);
      this.companyDetails.image = res.companyLogoUrl ? this.profile.STATIC_FILES_URL + res.companyLogoUrl : null;
      this.companyDetails.form.patchValue({
        name: res.name,
        licenseNumber: res.licenseNumber,
        phoneNumber: res.phoneNumber,
        faxNumber: res.faxNumber,
        street: res.street,
        city: res.city,
        state: res.state,
        zip: res.zip,
      });
      this.loader = true;
    }, error => {
      console.log(error);
    });
  }
  getLocation(): void {
    this.profile.getLocation(this.companyDetails);
  }
  changeState(state): void {
    this.profile.changeState(state, this.companyDetails);
  }

  setCity(state: string): void {
    this.profile.setCity(state, this.companyDetails);
  }
  handleFileInput(files): void{
    this.helper.handleFileInput(files, this.companyDetails);
  }
}
