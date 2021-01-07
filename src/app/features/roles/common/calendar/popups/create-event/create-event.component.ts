import {Component, Input, OnInit} from '@angular/core';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {FormBuilder, Validators} from '@angular/forms';
import {ConstantService} from '../../../../../../core/constant/constant.service';
import {HelperService} from '../../../../../../core/helper/helper.service';

@Component({
  selector: 'app-create-event',
  templateUrl: './create-event.component.html',
  styleUrls: ['./create-event.component.scss']
})
export class CreateEventComponent implements OnInit {
  @Input('name') name;
  teamData: any;
  selectedTeam: any[] = [];
  eventForm = this.fb.group({
    title: [null, Validators.required],
    date: [null, Validators.required],
    time: [null, Validators.required],
    note: [null, Validators.required],
    customEventCategory: this.fb.group({
      status: [null, Validators.required],
      value: [{value: null, disabled: null}, Validators.required],
    }),
    eventCategory: this.fb.group({
      status: [ null, Validators.required],
      value: [{value: null, disabled: null}, Validators.required],
    })
  });

  constructor(public activeModal: NgbActiveModal, private fb: FormBuilder, private helper: HelperService) {}

  ngOnInit(): void {
    this.helper.setModalPosition();
    this.chooseEventOrCustomCategory();
    this.teamData = {
      realEstateAgent: {
        name: 'Rafael Nadal',
        role: 'Real Estate Agent',
        image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRkqkWLzMbf_6cUuaxj9rAaJ61f3ntPBoto9g&usqp=CAU',
        phone: '+942 23 1 6783',
        email: 'abc@gmail.com'
      },
      lender:  {
        name: 'Parineeti Akash',
        role: 'Lender',
        image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT3UQl0sqcrJGd-tT4QCmfmPFv6AQKmQpSJHA&usqp=CAU',
        phone: '+942 23 1 6783',
        email: 'abc@gmail.com'
      },
      attorney: {
        name: 'Paul Jensen',
        role: 'Attorney',
        image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSr2RcD2fiReC2iLFK2CFL0MXCJrWaD7pPf5Q&usqp=CAU',
        phone: '+942 23 1 6783',
        email: 'abc@gmail.com'
      },
      homeInspector: {
        name: 'Ali Mustaqeem',
        role: 'Home Inspector',
        image: 'https://www.rashidahdevore.com/uploads/9/0/0/6/90067921/ssp-64544-fs-web.jpg',
        phone: '+942 23 1 6783',
        email: 'abc@gmail.com'
      },
      insuranceAgent: {
        name: 'Rahim Ali',
        role: 'Insurance Agent',
        image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRcQeTDPANCGDQkVik0SBPix19KW-EFxphfag&usqp=CAU',
        phone: '+942 23 1 6783',
        email: 'abc@gmail.com'
      }
    }
    this.eventForm.valueChanges.subscribe(res => {
      console.log(res);
    });

  }
  onSubmit(): void {
    this.activeModal.close({status: 'yes', data: Object.assign(this.eventForm.value, {team: this.selectedTeam})});
  }
  close(): void{
    this.activeModal.close({status: 'no'});
  }
  chooseEventOrCustomCategory(): void{
    this.eventForm.get('eventCategory').get('status').valueChanges.subscribe(result => {
      this.disableCheckBox(result, 'customEventCategory');
      this.toggleInput(result, 'customEventCategory', 'eventCategory');
    });
    this.eventForm.get('customEventCategory').get('status').valueChanges.subscribe(result => {
      this.disableCheckBox(result, 'eventCategory');
      this.toggleInput(result, 'eventCategory', 'customEventCategory');
    });
  }
  disableCheckBox(result, key): void{
    if (result){
      this.eventForm.patchValue({
        [key]: {
          status: false
        }
      });
    }
  }
  toggleInput(result, inputToggle, input): void{
    result === true ? this.eventForm.get(inputToggle).get('value').disable() :
      this.eventForm.get(inputToggle).get('value').enable();
    this.eventForm.get(input).get('value').enable();
  }
  toggleTeamMember(i, member): void{
    const tick = document.getElementById(i).children[0];
    const border = document.getElementById(i).children[1];
    console.log(member);
    if (getComputedStyle(tick).display === 'block') {
      (tick as HTMLImageElement).style.display = 'none';
      (border as HTMLImageElement).style.border = 'none';
      const index = this.selectedTeam.findIndex((x) => x === member);
      this.selectedTeam.splice(index, 1);
    } else {
      (tick as HTMLImageElement).style.display = 'block';
      (border as HTMLImageElement).style.border = '1px solid var(--green)';
      this.selectedTeam.push(member);
    }
  }
}
