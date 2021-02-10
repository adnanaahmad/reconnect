export interface FavoritesModel {
  home: Array<HomeModel>;
}
export interface HomeModel {
  id: number;
  images: Array<string>;
  listPrice: number;
  size: number;
  garage: number;
  beds: number;
  baths: {total: number, full: number, half: number};
  description: string;
  status: string;
  favorite: boolean;
  xf_garage_spaces: number;
}
