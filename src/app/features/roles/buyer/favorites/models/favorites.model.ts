export interface FavoritesModel {
  home: Array<HomeModel>;
}
export interface HomeModel {
  id: number;
  images: Array<string>;
  listPrice: number;
  size: number;
  beds: number;
  baths: {total: number, full: number, half: number};
  description: string;
  status: string;
  favorite: boolean;
  xf_garage_spaces: number;
}
export interface HomeDetails {
  _id: number;
  details: HomeModel;
}
