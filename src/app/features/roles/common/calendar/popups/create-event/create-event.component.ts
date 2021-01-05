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
    color: [''],
    colorIcon: ['']
  });
  constructor(public activeModal: NgbActiveModal, private fb: FormBuilder, private constant: ConstantService) { }

  ngOnInit(): void {
  }
  Onsubmit(){

      const randomColor = this.randomColor(this.constant.eventColorDetails);
      this.eventForm.patchValue({
        color: randomColor.color,
        colorIcon: randomColor.colorIcon
      });
      this.activeModal.close(this.eventForm.value);
  }
   randomColor(obj) {
    const keys = Object.keys(obj);
    return obj[keys[ keys.length * Math.random() << 0]];
  };
}
