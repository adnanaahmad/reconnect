export interface SavedSearchesModel {
  searches: Array<SearchModel>;
}

interface SearchModel {
  baths: {
    onePlus: boolean;
    twoPlus: boolean;
    threePlus: boolean;
    fourPlus: boolean;
    fivePlus: boolean;
    from: number;
    to: number;
  };
  beds: {
    onePlus: boolean;
    twoPlus: boolean;
    threePlus: boolean,
    fourPlus: boolean;
    fivePlus: boolean;
    from: number;
    to: number;
  };
  listingStatus: {
    any: boolean;
    existingHomes: boolean;
    fiftyFivePlusCommunity: boolean;
    foreclosures: boolean;
    hideForeclosures: boolean;
    hidePendingContingent: boolean;
    newConstruction: boolean;
    openHouse: boolean;
    priceReduced: boolean;
  };
  price: {
    from: number;
    to: number;
  };
  propertyType: {
    any: boolean;
    condo: boolean;
    farm: boolean;
    land: boolean;
    mobile: boolean;
    multiFamily: boolean;
    singleFamily: boolean;
  };
  moreFilters: {
    keywords: Array<string>;
    basement: boolean;
    swimmingPool: boolean;
    attic: boolean;
    waterFront: boolean;
  };
}
