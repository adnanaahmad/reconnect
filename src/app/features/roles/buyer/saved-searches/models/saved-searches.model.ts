export interface SavedSearchesModel {
  query: SearchModel;
  _id: number;
}

interface SearchModel {
  baths: string;
  beds: string;
  status: Array<string>;
  listPrice: string;
  propertyType: Array<string>;
}
