export interface HomeBuyingModel{
  article: ArticleModel;
  videoLibrary: Array<VideoLibraryModel>;
  resources: Array<ResourcesModel>;
}

interface ArticleModel{
  imageUrl: string;
  title: string;
  content: string;
}
interface VideoLibraryModel {
  title: string;
  videoUrl: string;
}
interface ResourcesModel {
  title: string;
  resourceUrl: string;
}
