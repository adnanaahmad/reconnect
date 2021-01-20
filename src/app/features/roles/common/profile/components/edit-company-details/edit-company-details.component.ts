import { Component, OnInit } from '@angular/core';
import {FormBuilder, Validators} from '@angular/forms';

@Component({
  selector: 'app-edit-company-details',
  templateUrl: './edit-company-details.component.html',
  styleUrls: ['./edit-company-details.component.scss']
})
export class EditCompanyDetailsComponent implements OnInit {
  companyDetails: any;
  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
    this.companyDetails = this.fb.group({
      image: [null, Validators.required],
      companyName: [null, Validators.required],
      license: [null, Validators.required],
      officePhone: [null, Validators.required],
      faxPhone: [null, Validators.required],
      street: [null, Validators.required],
      city: [null, Validators.required],
      state: [null, Validators.required],
      zipCode: [null, Validators.required],
    });
  }
  onSubmit(): void{
    console.log(this.companyDetails.value);
  }
}
