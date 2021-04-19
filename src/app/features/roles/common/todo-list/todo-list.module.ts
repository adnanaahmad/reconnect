import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TodoListRoutingModule } from './todo-list-routing.module';
import {TodoListComponent} from './components/todo-list/todo-list.component';
import {SharedModule} from '../../../../shared/shared.module';
import { CreateNewTaskComponent } from './popups/create-new-task/create-new-task.component';
import { ChooseTasksTypeComponent } from './popups/choose-tasks-type/choose-tasks-type.component';
import {NgbDateNativeAdapter} from '@ng-bootstrap/ng-bootstrap';


@NgModule({
  declarations: [TodoListComponent, CreateNewTaskComponent, ChooseTasksTypeComponent],
  imports: [
    CommonModule,
    TodoListRoutingModule,
    SharedModule
  ],
  providers: [NgbDateNativeAdapter]
})
export class TodoListModule { }
