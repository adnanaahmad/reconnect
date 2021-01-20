import {Component, HostListener, OnDestroy, OnInit} from '@angular/core';
import {FormBuilder, FormControl, Validators} from '@angular/forms';
import {SearchHomesModel} from '../../models/search-homes.model';
import {StoreService} from 'src/app/core/store/store.service';
import {Subscription} from 'rxjs';
import {ConstantService} from '../../../../../../core/constant/constant.service';
import {KeyValue} from '@angular/common';
import {HelperService} from '../../../../../../core/helper/helper.service';

@Component({
  selector: 'app-search-homes',
  templateUrl: './search-homes.component.html',
  styleUrls: ['./search-homes.component.scss'],
})
export class SearchHomesComponent implements OnInit, OnDestroy {
  /* .post (save search, apply filter, clear all) retrieves (search results),
     .get + id retrieves (current (all)filters + search results)
  */
  searchHome: SearchHomesModel = {} as SearchHomesModel;
  subscription: Subscription;
  constructor(private fb: FormBuilder,
              public store: StoreService,
              public constant: ConstantService,
              public  helper: HelperService) { }
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  ngOnInit(): void {
    this.store.toggleMoreFilter.subscribe(result => {
      this.searchHome.toggle = result;
    });
    this.searchHome.keyword = new FormControl(null);
    this.searchHome.keywordList = [];
    this.searchHome.toggle = false;
    this.searchHome.approvedLoanProgram = {
      fha: true,
      va: false,
      usda: false,
      conventional: false,
      homePossible: false,
      homeReady: false
    };
    this.searchHome.moreFilters = this.fb.group({
      propertyType: this.fb.group({
        singleFamily: [null],
        multiFamily: [null],
        farm: [null],
        mobile: [null],
        land: [null],
        condo: [null],
        any: [null]
      }),
      listingStatus: this.fb.group({
        any: [null],
        newConstruction: [null],
        fiftyFivePlusCommunity: [null],
        existingHomes: [null],
        foreclosures: [null],
        hidePendingContingent: [null],
        hideForeclosures: [null],
        priceReduced: [null],
        openHouse: [null]
      }),
      moreFilters: this.fb.group({
        keywords: [[]],
        basement: [null],
        swimmingPool: [null],
        attic: [null],
        waterFront: [null],
      }),
      price: this.fb.group({
        from: [null],
        to: [null]
      }),
      beds: this.fb.group({
        from: [null],
        to: [null],
        onePlus: [null],
        twoPlus: [null],
        threePlus: [null],
        fourPlus: [null],
        fivePlus: [null]
      }),
      baths: this.fb.group({
        from: [null],
        to: [null],
        onePlus: [null],
        twoPlus: [null],
        threePlus: [null],
        fourPlus: [null],
        fivePlus: [null]
      }),
    });
    this.subscription = this.store.savedSearch.subscribe((res) => {
        console.log('In search Home');
        if (res && res !== 1){
          // take object of savedSearch and call apply filter api (on apply, update savedSearch subject)
          this.searchHome.moreFilters.patchValue(res);
          console.log(this.searchHome.moreFilters.value);
          console.log(res);
        } else {
          // get call to retrieve search results and filters (default)
          console.log(res);
        }
      }, (error) => {
        console.log(error);
     });
    this.searchHome.moreFilters.valueChanges.subscribe(x => console.log(x));
    this.searchHome.homes = [
      {
        id: 1,
        image: 'https://images.pexels.com/photos/106399/pexels-photo-106399.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500',
        price: 200000,
        area: 2150,
        garage: 1,
        bedroom: 2,
        bathroom: 3,
        description: 'Here\'s whats happening to your reconnect account Here\'s what Here\'s whats happening to your reconnect account',
        status: 'Active',
        favorite: true
      },
      {
        id: 2,
        image: 'https://images.unsplash.com/photo-1580587771525-78b9dba3b914?ixlib=rb-1.2.1&ixid=MXwxMjA3fDB8MHxleHBsb3JlLWZlZWR8MXx8fGVufDB8fHw%3D&w=1000&q=80',
        price: 200000,
        area: 2150,
        garage: 1,
        bedroom: 2,
        bathroom: 3,
        description: 't Here\'s what Here\'s whats happening to your reconnect account',
        status: 'Active',
        favorite: false
      },
      {
        id: 3,
        image: 'https://archello.s3.eu-central-1.amazonaws.com/images/2020/03/15/DSCF2937.1584292578.7759.jpg',
        price: 200000,
        area: 2150,
        garage: 1,
        bedroom: 2,
        bathroom: 3,
        description: 'Here\'s whats happening to your  account Here\'s what Here\'s whats happening to your reconnect accoun reconnect account Here\'s what Here\'s whats happening to your reconnect account',
        status: 'Active',
        favorite: false
      },
      {
        id: 4,
        image: 'https://archello.s3.eu-central-1.amazonaws.com/images/2020/06/25/bloco-arquitetos-vila-rica-house-bras--lia-brazil-archello--19-.1593107058.9729.jpg',
        price: 200000,
        area: 2150,
        garage: 1,
        bedroom: 2,
        bathroom: 3,
        description: 'Here\'s whats happening to your reconnect account Here\'s what Here\'s whats happening to your reconnect account  account Here\'s what Here\'s whats happening to your reconnect accoun  account Here\'s what Here\'s whats happening to your reconnect accoun  account Here\'s what Here\'s whats happening to your reconnect accoun',
        status: 'Active',
        favorite: false
      },
      {
        id: 1,
        image: 'https://images.pexels.com/photos/106399/pexels-photo-106399.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500',
        price: 200000,
        area: 2150,
        garage: 1,
        bedroom: 2,
        bathroom: 3,
        description: 'Here\'s whats happening to your reconnect account Here\'s what Here\'s whats happening to your reconnect account',
        status: 'Active',
        favorite: false
      },
      {
        id: 2,
        image: 'https://images.unsplash.com/photo-1580587771525-78b9dba3b914?ixlib=rb-1.2.1&ixid=MXwxMjA3fDB8MHxleHBsb3JlLWZlZWR8MXx8fGVufDB8fHw%3D&w=1000&q=80',
        price: 200000,
        area: 2150,
        garage: 1,
        bedroom: 2,
        bathroom: 3,
        description: 't Here\'s what Here\'s whats happening to your reconnect account',
        status: 'Active',
        favorite: false
      },
      {
        id: 3,
        image: 'https://archello.s3.eu-central-1.amazonaws.com/images/2020/03/15/DSCF2937.1584292578.7759.jpg',
        price: 200000,
        area: 2150,
        garage: 1,
        bedroom: 2,
        bathroom: 3,
        description: 'Here\'s whats happening to your  account Here\'s what Here\'s whats happening to your reconnect accoun reconnect account Here\'s what Here\'s whats happening to your reconnect account',
        status: 'Active',
        favorite: false
      },
      {
        id: 4,
        image: 'https://archello.s3.eu-central-1.amazonaws.com/images/2020/06/25/bloco-arquitetos-vila-rica-house-bras--lia-brazil-archello--19-.1593107058.9729.jpg',
        price: 200000,
        area: 2150,
        garage: 1,
        bedroom: 2,
        bathroom: 3,
        description: 'Here\'s whats happening to your reconnect account Here\'s what Here\'s whats happening to your reconnect account  account Here\'s what Here\'s whats happening to your reconnect accoun  account Here\'s what Here\'s whats happening to your reconnect accoun  account Here\'s what Here\'s whats happening to your reconnect accoun',
        status: 'Active',
        favorite: false
      }
    ];
  }

  toggleMoreFilter(): boolean {
    this.searchHome.toggle = !this.searchHome.toggle;
    return this.searchHome.toggle;
  }
  hideMoreFilter(): void {
    this.store.updateToggleMoreFilter(false);
  }
  saveSearch(): void {
    console.log(this.searchHome.moreFilters.value);
  }
  cancel(event): void {
    event.target.parentElement.parentElement.classList.toggle('show');
  }
  keepDropdownOpen(event): void{
    event.stopPropagation();
  }
  applyFilter(): void{
    this.store.updateSavedSearch(this.searchHome.moreFilters.value);
  }
}
