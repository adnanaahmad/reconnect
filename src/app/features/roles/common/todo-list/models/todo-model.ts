export interface TodoModel {
 title: string;
 description: string;
 tags: TagsModel;
}

interface TagsModel {
  all: boolean;
  priority: boolean;
  starred: boolean;
  done: boolean;
  deleted: boolean;
}
