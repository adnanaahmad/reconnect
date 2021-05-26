import {FormGroup} from '@angular/forms';
import {Subscription} from 'rxjs';

export interface NewsFeedModel{
  adminPosts: Array<any>;
  newsFeed: Array<any>;
  subscription: Array<Subscription>;
  screenOne: boolean;
  post: any;
}
export interface CreatePostModel{
  form: FormGroup;
  media: Array<MediaModel>;
  nextScreen: boolean;
  subscription: Array<Subscription>;
  loader: any;
}
interface MediaModel{
  type: string;
  url: string;
}
export interface PostModel{
  title: string;
  description: string;
  media: Array<MediaModel>;
  _id: string;
}
