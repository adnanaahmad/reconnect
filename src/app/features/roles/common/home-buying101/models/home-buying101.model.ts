import {Subscription} from 'rxjs';

export interface HomeBuyingModel{
  blog: any;
  videos: Array<VideoLibraryModel>;
  resources: Array<any>;
  subscription: Array<Subscription>;
  screenOne: boolean;
  post: any;
}


interface ArticleModel{
  imageUrl: string;
  title: string;
  content: string;
}
interface VideoLibraryModel {
  title: string;
  media: Array<any>;
}
interface ResourcesModel {
  title: string;
  resourceUrl: string;
}
