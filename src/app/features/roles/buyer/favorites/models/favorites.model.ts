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
  favourite: boolean;
  xf_garage_spaces: number;
  financing: any;
  xf_no_bedrooms: number;
  xf_no_full_baths: number;
  xf_no_half_baths: number;
  address: {
    city: string;
    deliveryLine: string;
    state: string;
    street: string;
    zip: string;
  };
}
export interface HomeDetails {
  _id: number;
  details: HomeModel;
}
