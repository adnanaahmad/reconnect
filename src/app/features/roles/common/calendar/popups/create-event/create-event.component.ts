import {AfterViewInit, ChangeDetectorRef, Component, ElementRef, Input, OnInit, QueryList, ViewChild, ViewChildren} from '@angular/core';
import {NgbActiveModal, NgbDateNativeAdapter} from '@ng-bootstrap/ng-bootstrap';
import {FormBuilder, Validators} from '@angular/forms';
import {ConstantService} from '../../../../../../core/constant/constant.service';
import {HelperService} from '../../../../../../core/helper/helper.service';

@Component({
  selector: 'app-create-event',
  templateUrl: './create-event.component.html',
  styleUrls: ['./create-event.component.scss']
})
export class CreateEventComponent implements OnInit, AfterViewInit {
  @Input() edit;
  @Input() eventCategories;
  @ViewChildren('member') teamMembers: QueryList<ElementRef>;
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

  constructor(public activeModal: NgbActiveModal,
              private fb: FormBuilder,
              private helper: HelperService,
              private dateFormat: NgbDateNativeAdapter,
              private ref: ChangeDetectorRef) {}

  ngOnInit(): void {
    //console.log(this.eventCategories);
    this.helper.setModalPosition();
    this.chooseEventOrCustomCategory();
    this.teamData = [
      {
        name: 'Rafael Nadal',
        role: 'Real Estate Agent',
        image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRkqkWLzMbf_6cUuaxj9rAaJ61f3ntPBoto9g&usqp=CAU',
        phone: '+942 23 1 6783',
        email: 'abc@gmail.com'
      },
      {
        name: 'Parineeti Akash',
        role: 'Lender',
        image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT3UQl0sqcrJGd-tT4QCmfmPFv6AQKmQpSJHA&usqp=CAU',
        phone: '+942 23 1 6783',
        email: 'abc@gmail.com'
      },
      {
        name: 'Paul Jensen',
        role: 'Attorney',
        image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSr2RcD2fiReC2iLFK2CFL0MXCJrWaD7pPf5Q&usqp=CAU',
        phone: '+942 23 1 6783',
        email: 'abc@gmail.com'
      },
      {
        name: 'Ali Mustaqeem',
        role: 'Home Inspector',
        image: 'https://www.rashidahdevore.com/uploads/9/0/0/6/90067921/ssp-64544-fs-web.jpg',
        phone: '+942 23 1 6783',
        email: 'abc@gmail.com'
      },
      {
        name: 'Rahim Ali',
        role: 'Insurance Agent',
        image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRcQeTDPANCGDQkVik0SBPix19KW-EFxphfag&usqp=CAU',
        phone: '+942 23 1 6783',
        email: 'abc@gmail.com'
      }
    ];
    // this.eventForm.valueChanges.subscribe(res => {
    //   console.log(res);
    // });
  }
  ngAfterViewInit(): void {
    this.editForm();
  }

  editForm(): void{
    if (this.edit){
      this.eventForm.reset();
      this.eventForm.patchValue({
        title: this.edit._def.title,
        date: this.dateFormat.fromModel(this.edit._instance.range.start),
        time: this.edit._def.extendedProps.time,
        note: this.edit._def.extendedProps.note,
      });
      this.eventForm.get('eventCategory').get('status').setValue(true);
      this.eventForm.get('eventCategory').get('value').setValue(this.edit._def.extendedProps.category);
      this.selectedTeam = this.edit._def.extendedProps.team;
      this.ref.detectChanges();
      this.teamMembers.forEach((element) => {
        if (this.selectedTeam.find( x => x.image === element.nativeElement.children[1].src)){
          const tick = element.nativeElement.children[0];
          const border = element.nativeElement.children[1];
          (tick as HTMLImageElement).style.display = 'block';
          (border as HTMLImageElement).style.border = '1px solid var(--green)';
        }
      });
    }
  }
  onSubmit(): void {
    this.activeModal.close({status: 'yes', data: Object.assign(this.eventForm.value, {team: this.selectedTeam})});
  }
  close(): void{
    this.activeModal.close({status: 'no'});
  }
  chooseEventOrCustomCategory(): void{
    this.eventForm.get('eventCategory').get('status').valueChanges.subscribe(result => {
      this.uncheck(result, 'customEventCategory');
      this.toggleInput(result, 'customEventCategory', 'eventCategory');
    });
    this.eventForm.get('customEventCategory').get('status').valueChanges.subscribe(result => {
      this.uncheck(result, 'eventCategory');
      this.toggleInput(result, 'eventCategory', 'customEventCategory');
    });
  }
  uncheck(result, key): void{
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
    this.helper.toggleTeamMember(i, member, this.selectedTeam);
  }
}
