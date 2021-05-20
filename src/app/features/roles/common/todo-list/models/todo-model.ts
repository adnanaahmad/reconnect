import {Subscription} from 'rxjs';

export interface TodoModel {
    list: Array<TaskModel>;
    eventCategories: Array<any>;
    filter: string;
    subscription: Array<Subscription>;
    dates: DatesModel;
}

interface TaskModel{
    title: string;
    note: string;
    date: Date;
    _id: string;
    priority: boolean;
    starred: boolean;
    done: boolean;
    deleted: boolean;
    team: string;
    members: Array<string>;
    category: any;
    addEvent: boolean;
}

interface TagsModel {
    all: boolean;
    priority: boolean;
    starred: boolean;
    done: boolean;
    deleted: boolean;
}
export interface EditTaskModel{
    title: string;
    note: string;
    date: Date;
    _id: string;
}
interface DatesModel{
    todoStartDate: string;
    todoEndDate: string;
}
