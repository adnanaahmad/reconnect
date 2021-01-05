export interface FavoritesModel {
  home: Array<HomeModel>;
}
export interface HomeModel {
  id: number;
  image: string;
  price: number;
  area: number;
  garage: number;
  bedroom: number;
  bathroom: number;
  description: string;
  status: string;
  favorite: boolean;
}
