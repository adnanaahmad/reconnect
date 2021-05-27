import {AfterViewInit, ChangeDetectorRef, Component, Input, OnInit} from '@angular/core';
import {HelperService} from '../../../../../../core/helper/helper.service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {take} from 'rxjs/operators';
import {ToastrService} from 'ngx-toastr';
import {NgbActiveModal, NgbDateNativeAdapter, NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {TodoListService} from '../../services/todo-list.service';
import {EditTaskModel} from '../../models/todo-model';
import {DatePipe} from '@angular/common';

@Component({
  selector: 'app-create-new-task',
  templateUrl: './create-new-task.component.html',
  styleUrls: ['./create-new-task.component.scss']
})
export class CreateNewTaskComponent implements OnInit, AfterViewInit {
  @Input() edit: EditTaskModel;
  todoTask: FormGroup;
  minDate: any;
  constructor(private helper: HelperService,
              private fb: FormBuilder,
              private toaster: ToastrService,
              private activeModal: NgbActiveModal,
              private modalService: NgbModal,
              private todoService: TodoListService,
              private dateFormat: NgbDateNativeAdapter,
              private ref: ChangeDetectorRef) { }


  ngOnInit(): void {
    const current = new Date();
    this.minDate = {
      year: current.getFullYear(),
      month: current.getMonth() + 1,
      day: current.getDate()
    };
    this.helper.setModalPosition();
    this.todoTask = this.fb.group({
      title: [null, Validators.required],
      note: [null, Validators.required],
      date: [null, Validators.required]
    });
  }
  ngAfterViewInit(): void {
    if (this.edit){
      this.editTask();
    }
  }
  editTask(): void{
    this.todoTask.patchValue({
      title: this.edit.title,
      note: this.edit.note,
      date: this.dateFormat.fromModel(new Date(this.edit.date))
    });
    this.ref.detectChanges();
  }
  close(): void{
    this.activeModal.close({status: 'no'});
  }
  onSubmit(): void{
    if (this.todoTask.valid){
      const date = new Date(new DatePipe('en-US').transform(this.dateFormat.toModel(this.todoTask.get('date').value), 'yyyy-MM-dd'));
      (this.edit ?
          this.todoService.editTodo({...this.todoTask.value, date: date}, this.edit._id) :
          this.todoService.createTodo({...this.todoTask.value, addEvent: false, date: date})).pipe(take(1)).subscribe(res => {
            this.edit ? this.toaster.success('Task edited successfully') : this.toaster.success('Task created successfully');
            this.activeModal.close({status: 'yes', data: {...this.todoTask.value, ...res.result}});
          }, error => {
              this.edit ? this.toaster.error('Failed to edit task') : this.toaster.error('Failed to create task');
          });
    } else{
      this.todoTask.markAllAsTouched();
    }
  }
}
