export interface TodoModel {
    list: Array<TaskModel>;
    eventCategories: Array<any>;
    filter: string;
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
