import { Component, OnInit } from '@angular/core';
import {ConstantService} from '../../../../../../core/constant/constant.service';
import {SavedSearchesModel} from '../../models/saved-searches.model';
import {Router} from '@angular/router';
import {StoreService} from '../../../../../../core/store/store.service';
import {KeyValue} from '@angular/common';


@Component({
  selector: 'app-saved-searches',
  templateUrl: './saved-searches.component.html',
  styleUrls: ['./saved-searches.component.scss']
})
export class SavedSearchesComponent implements OnInit {
  savedSearch: SavedSearchesModel = {} as SavedSearchesModel;
  constructor(public constant: ConstantService, private router: Router, private store: StoreService) { }

  ngOnInit(): void {

    this.savedSearch.searches = [{
      baths: {
        onePlus: false,
        twoPlus: false,
        threePlus: false,
        fourPlus: false,
        fivePlus: false,
        from: 1,
        to: 3,
      },
      beds: {
        onePlus: false,
        twoPlus: true,
        threePlus: false,
        fourPlus: false,
        fivePlus: true,
        from: null,
        to: null,
      },
      listingStatus: {
        any: false,
        existingHomes: true,
        fiftyFivePlusCommunity: false,
        foreclosures: false,
        hideForeclosures: false,
        hidePendingContingent: false,
        newConstruction: false,
        openHouse: true,
        priceReduced: false
      },
      price: {
        from: 250000,
        to: 3001
      },
      propertyType: {
        any: false,
        condo: false,
        farm: false,
        land: false,
        mobile: true,
        multiFamily: false,
        singleFamily: true
      },
      moreFilters: {
        keywords: ['Pool', 'Terrace'],
        basement: true,
        swimmingPool: false,
        attic: true,
        waterFront: false
      }

    },
      {
        baths: {
          onePlus: null,
          twoPlus: true,
          threePlus: true,
          fourPlus: true,
          fivePlus: false,
          from: null,
          to: null,
        },
        beds: {
          onePlus: true,
          twoPlus: true,
          threePlus: true,
          fourPlus: true,
          fivePlus: true,
          from: null,
          to: null,
        },
        listingStatus: {
          any: false,
          existingHomes: true,
          fiftyFivePlusCommunity: true,
          foreclosures: true,
          hideForeclosures: true,
          hidePendingContingent: true,
          newConstruction: false,
          openHouse: true,
          priceReduced: false
        },
        price: {
          from: 250000,
          to: 3001
        },
        propertyType: {
          any: false,
          condo: true,
          farm: true,
          land: true,
          mobile: true,
          multiFamily: true,
          singleFamily: true
        },
        moreFilters: {
          keywords: ['Pool', 'Terrace'],
          basement: true,
          swimmingPool: true,
          attic: true,
          waterFront: true
        }

      }];
  }

  objectValuesNull(value): boolean{
    return !Object.values(value).every(o => o === null);
  }

  openPropertySearch(value): void{
    this.store.updateSavedSearch(value);
    this.router.navigateByUrl('/home/searchHomes');
  }
  deleteSearch(): void{
    console.log('delete');
  }
  originalOrder = (a: KeyValue<number, string>, b: KeyValue<number, string>): number => {
    return 0;
  };
}
