import { Component, OnInit } from '@angular/core';
import {TodoModel} from '../../models/todo-model';
import {NgbModal, NgbModalConfig} from '@ng-bootstrap/ng-bootstrap';
import {CreateNewTaskComponent} from '../../popups/create-new-task/create-new-task.component';
import {TodoListService} from '../../services/todo-list.service';
import {take} from 'rxjs/operators';
import {CreateEventComponent} from '../../../../../../shared/components/create-event/create-event.component';
import {ChooseTasksTypeComponent} from '../../popups/choose-tasks-type/choose-tasks-type.component';
import {forkJoin} from 'rxjs';
import {ConstantService} from '../../../../../../core/constant/constant.service';
import {ToastrService} from 'ngx-toastr';
import {StoreService} from '../../../../../../core/store/store.service';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.scss']
})
export class TodoListComponent implements OnInit {
  todo: TodoModel = {} as TodoModel;
  constructor(private configuration: NgbModalConfig,
              private modalService: NgbModal,
              private todoService: TodoListService,
              public constant: ConstantService,
              private toaster: ToastrService,
              public store: StoreService) {
    configuration.centered = true;
    configuration.container = 'app-todo-list';
  }

  ngOnInit(): void {
    this.getTodoList();
  }
  getTodoList(): void{
    this.store.updateProgressBarLoading(true);
    forkJoin([this.todoService.getCalendarCategories(), this.todoService.getTodoList()]).pipe(take(1)).subscribe(res => {
      this.todo.eventCategories = res[0].result;
      this.todo.list = res[1].result;
      this.filterSelected(this.constant.TODO_FILTERS.ALL);
      this.store.updateProgressBarLoading(false);
    }, error => {
      console.log(error);
      this.store.updateProgressBarLoading(false);
    });
  }
  chooseTask(): void{
    const modalRef = this.modalService.open(ChooseTasksTypeComponent);
    modalRef.result.then((result) => {
      if (result.status === 'simple') {
        setTimeout(res => {
          this.createNewTask();
        }, 1);
      } else if (result.status === 'event'){
        this.addNewEvent();
      }
    }, error => {
      console.log(error);
    });
  }

  createNewTask(): void{
    const modalRef = this.modalService.open(CreateNewTaskComponent);
    modalRef.result.then((result) => {
      if (result.status === 'yes') {
        console.log(result.data);
        this.todo.list.unshift(result.data);
      }
    }, error => {
      console.log(error);
    });
  }

  addNewEvent(): void{
    const modalRef = this.modalService.open(CreateEventComponent);
    modalRef.componentInstance.eventCategories = this.todo.eventCategories;
    modalRef.componentInstance.eventBasedTask = true;
    modalRef.result.then((result) => {
      if (result.status === 'yes') {
        console.log(result.data);
        this.todo.list.unshift(result.data);
      }
    }, error => {
      console.log(error);
    });
  }
  editTask(data, index): void{
    if (data.event) {
      const modalRef = this.modalService.open(CreateEventComponent);
      modalRef.componentInstance.edit = this.editEventData(data);
      modalRef.componentInstance.eventCategories = this.todo.eventCategories;
      modalRef.componentInstance.eventBasedTask = true;
      modalRef.result.then((result) => {
        if (result.status === 'yes') {
          this.todo.list[index] = result.data;
        }
      }, error => {
        console.log(error);
      });
    } else {
      const modalRef = this.modalService.open(CreateNewTaskComponent);
      modalRef.componentInstance.edit = data;
      modalRef.result.then((result) => {
        if (result.status === 'yes') {
          this.todo.list[index] = result.data;
        }
      }, error => {
        console.log(error);
      });
    }
  }
  editEventData(data): {_instance: any; _def: any; } {
    return {
      _instance: {
        range: {
          start: data.date
        }
      },
      _def: {
        title: data.title,
        extendedProps: {
          team: data.event.team,
          members: data.event.members,
          category: data.event.category,
          note: data.note,
          _id: data._id
        }
      }
    };
  }
  editTags(tag, task, index): void{
    const data = {
      priority: task.priority,
      starred: task.starred,
      done: task.done,
      deleted: task.deleted,
    };
    switch (tag) {
      case this.constant.TODO_FILTERS.DELETED:
        this.editTagsHelper({...data, deleted: true}, task, tag, index);
        break;
      case this.constant.TODO_FILTERS.DONE:
        this.editTagsHelper({...data, done: !data.done}, task, tag, index);
        task.done = !task.done;
        break;
      case this.constant.TODO_FILTERS.PRIORITY:
        this.editTagsHelper({...data, priority: !data.priority}, task, tag, index);
        task.priority = !task.priority;
        break;
      case this.constant.TODO_FILTERS.STARRED:
        this.editTagsHelper({...data, starred: !data.starred}, task, tag, index);
        task.starred = !task.starred;
        break;
      default:
        break;
    }
  }
  editTagsHelper(data, task, tag, index): void{
    this.todoService.editTags(data, task._id).pipe(take(1)).subscribe(res => {
      this.todo.list = res.result;
      switch (tag) {
        case this.constant.TODO_FILTERS.DELETED:
          this.toaster.success('Task is deleted');
          break;
        case this.constant.TODO_FILTERS.DONE:
          data.done ? this.toaster.success('Task is done') :
              this.toaster.success('Task is un-done');
          break;
        case this.constant.TODO_FILTERS.PRIORITY:
          data.priority ? this.toaster.success('Priority added to task') :
              this.toaster.success('Priority removed from task');
          break;
        case this.constant.TODO_FILTERS.STARRED:
          data.starred ? this.toaster.success('Task marked as important') :
              this.toaster.success('Task is no longer important');
          break;
        default:
          break;
      }
    }, error => {
        console.log(error);
        this.toaster.error('Failed to edit tag');
    });
  }
  filterSelected(data): void{
    this.store.updateTodoFilter(data);
  }
}
