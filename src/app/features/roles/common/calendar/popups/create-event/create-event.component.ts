import {Component, Input, OnInit} from '@angular/core';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {FormBuilder, Validators} from '@angular/forms';
import {ConstantService} from '../../../../../../core/constant/constant.service';

@Component({
  selector: 'app-create-event',
  templateUrl: './create-event.component.html',
  styleUrls: ['./create-event.component.scss']
})
export class CreateEventComponent implements OnInit {
  @Input('name') name;
  eventForm = this.fb.group({
    title: ['', Validators.required],
    date: ['', Validators.required],
    time: ['', Validators.required],
    note: ['', Validators.required],
    customCategory: ['', Validators.required],
  });

  constructor(public activeModal: NgbActiveModal,
              private fb: FormBuilder,
              private constant: ConstantService) {
  }

  ngOnInit(): void {
  }

  onSubmit(): void {
    this.activeModal.close({status: 'yes', data: this.eventForm.value});
    }
}
