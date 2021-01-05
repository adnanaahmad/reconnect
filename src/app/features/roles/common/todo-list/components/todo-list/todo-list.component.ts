import { Component, OnInit } from '@angular/core';
import {TodoModel} from '../../models/todo-model';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.scss']
})
export class TodoListComponent implements OnInit {
  todoList: Array<TodoModel> = {} as Array<TodoModel>;
  checkmark: boolean;
  checkmark1: boolean;
  constructor() { }

  ngOnInit(): void {
    this.checkmark = true;
    this.checkmark1 = false;

    this.todoList = [
      {
        title: 'Create Notification',
        description: 'he browser will break lines according to normal line breaking ruleshe browser will break lines according to normal line breaking ruleshe browser will break lines according to normal line breaking rules the browser will break lines according to normal line breaking rules. ... the small amount of space available, as if the word were multiple words. ... and word-wrap will pass CSS validation as long as the validator is set to test',
        tags: {
          all: true,
          priority: true,
          done: true,
          deleted: false,
          starred: false
        }
      },
      {
        title: 'Grab Keys at Noon',
        description: 'the small amount of space available, as if the word were multiple words',
        tags: {
          all: true,
          priority: false,
          done: false,
          deleted: true,
          starred: false
        }
      },
      {
        title: 'Meet Former Colleague',
        description: 'he browser will break lines according to normal line breaking ruleshe browser will break lines according to normal line breaking ruleshe browser will br',
        tags: {
          all: true,
          priority: true,
          done: false,
          deleted: false,
          starred: true
        }
      }
    ];
  }

}
