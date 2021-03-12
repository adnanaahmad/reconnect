import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormBuilder, FormControl} from '@angular/forms';
import {SearchHomesModel} from '../../models/search-homes.model';
import {StoreService} from 'src/app/core/store/store.service';
import {ConstantService} from '../../../../../../core/constant/constant.service';
import {HelperService} from '../../../../../../core/helper/helper.service';
import {SearchHomeService} from '../../services/search-home.service';
import {debounceTime, distinctUntilChanged, take} from 'rxjs/operators';
import {ActivatedRoute, Router} from '@angular/router';
import {Location} from '@angular/common';
import {BehaviorSubject, Subscription} from 'rxjs';
import {ToastrService} from 'ngx-toastr';

@Component({
    selector: 'app-search-homes',
    templateUrl: './search-homes.component.html',
    styleUrls: ['./search-homes.component.scss'],
})
export class SearchHomesComponent implements OnInit, OnDestroy {
    searchHome: SearchHomesModel = {} as SearchHomesModel;
    private subscription: Subscription[];

    constructor(private fb: FormBuilder,
                public store: StoreService,
                public constant: ConstantService,
                public  helper: HelperService,
                public searchHomeService: SearchHomeService,
                public router: Router,
                private activatedRoute: ActivatedRoute,
                private toaster: ToastrService,
                private location: Location) {
    }

    ngOnInit(): void {
        this.subscription = [];
        this.initialiseFilter();
        this.chooseEitherRangeOrMultiSelect();
        this.getHouses();
        this.autoComplete();
        this.subscription.push(
            this.searchHome.searchKeyword.valueChanges.subscribe(res => {
                if (res === '') {
                    this.searchHome.polygon = null;
                }
            })
        );
        // TODO: More Filters ?
        this.searchHome.keyword = new FormControl(null);
        this.searchHome.keywordList = [];

        this.searchHome.toggle = false;
    }

    ngOnDestroy(): void {
        this.subscription.forEach(s => s.unsubscribe());
        this.store.updateToggleLoanType(null);
    }

    get searchContainerWidth(): number {
        return document.getElementById('search').offsetWidth;
    }

    setFilters(params): void {
        this.searchHome.moreFilters.patchValue({
            propertyType: {
                Apartment: params.propertyType ? params.propertyType.includes('Apartment') : null,
                'Attached (Townhouse/Rowhouse/Duplex)': params.propertyType ? params.propertyType.includes('Attached (Townhouse/Rowhouse/Duplex)') : null,
                Condominium: params.propertyType ? params.propertyType.includes('Condominium') : null,
                Farm: params.propertyType ? params.propertyType.includes('Farm') : null,
                'Mobile Home': params.propertyType ? params.propertyType.includes('Mobile Home') : null,
                'Single Family': params.propertyType ? params.propertyType.includes('Single Family') : null,
                'Condominium/Co-Op': params.propertyType ? params.propertyType.includes('Condominium/Co-Op') : null,
                Land: params.propertyType ? params.propertyType.includes('Land') : null,
                'Multi-family': params.propertyType ? params.propertyType.includes('Multi-family') : null,
            },
            status: {
                Active: params.status ? params.status.includes('Active') : null,
                'Back on Market': params.status ? params.status.includes('Back on Market') : null,
                Contingent: params.status ? params.status.includes('Contingent') : null,
                Extended: params.status ? params.status.includes('Extended') : null,
                New: params.status ? params.status.includes('New') : null,
                'Price Changed': params.status ? params.status.includes('Price Changed') : null,
                Reactivated: params.status ? params.status.includes('Reactivated') : null,
            },
            listPrice: {
                from: params.listPrice ? params.listPrice.split(':')[0] : null,
                to: params.listPrice ? params.listPrice.split(':')[1] : null
            },
            beds: {
                from: params.beds ? params.beds.includes(':') ? params.beds.split(':')[0] : null : null,
                to: params.beds ? params.beds.includes(':') ? params.beds.split(':')[1] : null : null,
                value: params.beds ? !params.beds.includes(':') ? params.beds : null : null
            },
            baths: {
                from: params.baths ? params.baths.includes(':') ? params.baths.split(':')[0] : null : null,
                to: params.baths ? params.baths.includes(':') ? params.baths.split(':')[1] : null : null,
                value: params.baths ? !params.baths.includes(':') ? params.baths : null : null
            },
        });
    }

    getHouses(): void {
        this.subscription.push(
            this.activatedRoute.queryParams.subscribe(params => {
                if (Object.keys(params).length !== 0) {
                    this.setFilters(params);
                    this.setDefaultLoanTypeWithQueryParams(params);
                    this.setSavedSearchId(params);
                    this.applyFilters();
                } else {
                    this.searchHomeService.getHouses('').pipe(take(1)).subscribe(res => {
                        console.log(res);
                        res = res.result;
                        this.searchHome.homes = res.listings;
                        this.searchHome.total = res.total;
                        this.searchHome.pageNumber = res.paging.number;
                        this.searchHome.loan = res.userLoan;
                        this.setDefaultLoanType();
                    }, error => {
                        console.log(error);
                    });
                }
            })
        );
    }

    setDefaultLoanTypeWithQueryParams(params): void {
        if (params.loanType) {
            this.store.updateToggleLoanType(params.loanType);
        }
    }

    setSavedSearchId(params): void {
        if (params.savedSearchId) {
            this.searchHome.savedSearchId = params.savedSearchId;
        }
    }

    chooseEitherRangeOrMultiSelect(): void {
        this.helperForChoose('beds');
        this.helperForChoose('baths');
    }

    helperForChoose(object: string): void {
        this.subscription.push(
            this.searchHome.moreFilters.get([object, 'value']).valueChanges.subscribe(res => {
                if (res) {
                    this.searchHome.moreFilters.get([object, 'from']).setValue(null);
                    this.searchHome.moreFilters.get([object, 'to']).setValue(null);
                    this.searchHome.moreFilters.get([object, 'to']).disable();
                }
            })
        );
        this.subscription.push(
            this.searchHome.moreFilters.get([object, 'from']).valueChanges.subscribe(res => {
                if (res) {
                    this.searchHome.moreFilters.get([object, 'value']).setValue(null);
                }
            })
        );
    }

    initialiseFilter(): void {
        this.searchHome.moreFilters = this.fb.group({
            propertyType: this.fb.group({
                Apartment: [null],
                'Attached (Townhouse/Rowhouse/Duplex)': [null],
                Condominium: [null],
                Farm: [null],
                'Mobile Home': [null],
                'Single Family': [null],
                'Condominium/Co-Op': [null],
                Land: [null],
                'Multi-family': [null]
            }),
            status: this.fb.group({
                Active: [null],
                'Back on Market': [null],
                Contingent: [null],
                Extended: [null],
                New: [null],
                'Price Changed': [null],
                Reactivated: [null],
            }),
            moreFilters: this.fb.group({
                keywords: [[]],
                basement: [null],
                swimmingPool: [null],
                attic: [null],
                waterFront: [null],
            }),
            listPrice: this.fb.group({
                from: [null],
                to: [{value: null, disabled: true}]
            }),
            beds: this.fb.group({
                from: [null],
                to: [{value: null, disabled: true}],
                value: [null]
            }),
            baths: this.fb.group({
                from: [null],
                to: [{value: null, disabled: true}],
                value: [null]
            }),
        });
        this.searchHome.sortBy = new FormControl(null);
    }

    toggleMoreFilter(): boolean {
        this.searchHome.toggle = !this.searchHome.toggle;
        return this.searchHome.toggle;
    }

    hideMoreFilter(): void {
        this.store.updateToggleMoreFilter(false);
    }

    saveSearch(): void {
        const data = this.filtersDataToQuery;
        const loanType = this.store.toggleLoanTypeSubject.value ? `${data ? '&' : ''}loanType=${this.store.toggleLoanTypeSubject.value}` : '';
        if (this.searchHome.savedSearchId) {
            this.searchHomeService.updateSearch(this.filtersObject, this.searchHome.savedSearchId).pipe(take(1)).subscribe(res => {
                this.toaster.success('Updated Save Search');
                this.searchHome.savedSearchId = null;
                window.history.replaceState({}, '', `/home/searchHomes?${data}${loanType}`);
                this.router.navigateByUrl('home/savedSearches').then();
            }, error => {
                this.toaster.error('Failed To Update Save Search');
                window.history.replaceState({}, '', `/home/searchHomes?${data}${loanType}`);
                this.searchHome.savedSearchId = null;
            });
        } else {
            this.searchHomeService.saveSearch(this.filtersObject).pipe(take(1)).subscribe(res => {
                this.toaster.success('Added To Save Search');
            }, error => {
                this.toaster.error('Failed To Add To Save Search');
            });
        }
    }

    cancel(event): void {
        event.target.parentElement.parentElement.classList.toggle('show');
    }

    keepDropdownOpen(event): void {
        event.stopPropagation();
    }

    applyFilter(event): void {
        this.applyFilters(event);
    }

    applyFilters(events?): void {
        const data = this.filtersDataToQuery;
        console.log(data);
        const loanType = this.store.toggleLoanTypeSubject.value ? `${data ? '&' : ''}loanType=${this.store.toggleLoanTypeSubject.value}` : '';
        const savedSearchId = this.searchHome.savedSearchId ? `${data || loanType ? '&' : ''}savedSearchId=${this.searchHome.savedSearchId}` : '';
        window.history.replaceState({}, '', `/home/searchHomes?${data}${loanType}${savedSearchId}`);
        const sortBy = this.searchHome.sortBy.value ? `&sortField=listPrice&sortOrder=${this.searchHome.sortBy.value}` : '';
        const searchInput = this.searchHome.polygon ? `&geometry=true&polygon=$${this.searchHome.polygon}` : '';
        this.searchHomeService.getHouses(data + sortBy + searchInput).pipe(take(1)).subscribe(res => {
            res = res.result;
            this.searchHome.homes = res.listings;
            this.searchHome.total = res.total;
            this.searchHome.pageNumber = res.paging.number;
            this.searchHome.loan = res.userLoan;
            this.setDefaultLoanType();
            this.store.updateToggleMoreFilter(false);
            if (events) {
                events.target.parentElement.parentElement.classList.toggle('show');
            }
        }, error => {
            console.log(error);
        });
    }

    get filtersDataToQuery(): {} {
        const data = Object.assign({},
            this.filtersObject);
        Object.keys(data).forEach(key => {
            if (data[key] ? data[key].length === 0 : true) {
                delete data[key];
            }
        });
        console.log('data', data);
        return Object.keys(data).map(key => key + '=' + data[key]).join('&');
    }

    get filtersObject(): {} {
        return {
            status: Object.keys(this.searchHome.moreFilters.get('status').value).filter(key =>
                this.searchHome.moreFilters.get('status').value[key]),
            propertyType: Object.keys(this.searchHome.moreFilters.get('propertyType').value).filter(key =>
                this.searchHome.moreFilters.get('propertyType').value[key]),
            listPrice: this.searchHome.moreFilters.get(['listPrice', 'from']).value &&
            this.searchHome.moreFilters.get(['listPrice', 'to']).value ?
                `${this.searchHome.moreFilters.get(['listPrice', 'from']).value}:${this.searchHome.moreFilters.get(['listPrice', 'to']).value}` : null,
            beds: this.searchHome.moreFilters.get(['beds', 'from']).value && this.searchHome.moreFilters.get(['beds', 'to']).value ?
                `${this.searchHome.moreFilters.get(['beds', 'from']).value}:${this.searchHome.moreFilters.get(['beds', 'to']).value}`
                : this.searchHome.moreFilters.get(['beds', 'value']).value,
            baths: this.searchHome.moreFilters.get(['baths', 'from']).value && this.searchHome.moreFilters.get(['baths', 'to']).value ?
                `${this.searchHome.moreFilters.get(['baths', 'from']).value}:${this.searchHome.moreFilters.get(['baths', 'to']).value}`
                : this.searchHome.moreFilters.get(['baths', 'value']).value
        };
    }

    pageChange(pageNumber): void {
        console.log(pageNumber);
        const data = this.filtersDataToQuery;
        const sortBy = this.searchHome.sortBy.value ? `&sortField=listPrice&sortOrder=${this.searchHome.sortBy.value}` : '';
        const searchInput = this.searchHome.polygon ? `&geometry=true&polygon=$${this.searchHome.polygon}` : '';
        this.searchHomeService.getHouses(`${data}&pageNumber=${pageNumber}${sortBy}${searchInput}`).pipe(take(1)).subscribe(res => {
            res = res.result;
            this.searchHome.homes = res.listings;
            this.searchHome.total = res.total;
            this.searchHome.pageNumber = res.paging.number;
            this.searchHome.loan = res.userLoan;
            this.setDefaultLoanType();
        }, error => {
            console.log(error);
        });
    }

    sortBy(): void {
        const data = this.filtersDataToQuery;
        const searchInput = this.searchHome.polygon ? `&geometry=true&polygon=$${this.searchHome.polygon}` : '';
        this.searchHomeService.getHouses(`${data}&sortField=listPrice&sortOrder=${this.searchHome.sortBy.value}${searchInput}`).pipe(take(1)).subscribe(res => {
            res = res.result;
            this.searchHome.homes = res.listings;
            this.searchHome.total = res.total;
            this.searchHome.pageNumber = res.paging.number;
            this.searchHome.loan = res.userLoan;
            this.setDefaultLoanType();
        }, error => {
            console.log(error);
        });
    }

    autoComplete(): void {
        this.searchHome.hideSearch = true;
        this.searchHome.searchKeyword = new FormControl(null);
        this.searchHome.autoComplete = new BehaviorSubject<any>(null);
        this.subscription.push(
            this.searchHome.searchKeyword.valueChanges.pipe(debounceTime(300), distinctUntilChanged()).subscribe(data => {
                if (data) {
                    this.subscription.push(
                        this.searchHomeService.searchHomeByName(data).subscribe(res => {
                            console.log(res);
                            this.searchHome.autoComplete.next(res.result.areas);
                            if (document.getElementById('search-list')) {
                                document.getElementById('search-list').style.display = 'block';
                            }
                        }, error => {
                            console.log(error);
                        })
                    );
                }
            })
        );
    }

    searchHomeByName(): void {
        console.log(this.searchHome.polygon);
        const data = this.filtersDataToQuery;
        const sortBy = this.searchHome.sortBy.value ? `&sortField=listPrice&sortOrder=${this.searchHome.sortBy.value}` : '';
        const searchInput = this.searchHome.polygon ? `&geometry=true&polygon=$${this.searchHome.polygon}` : '';
        this.searchHomeService.getHouses(data + sortBy + searchInput).pipe(take(1)).subscribe(res => {
            res = res.result;
            this.searchHome.homes = res.listings;
            this.searchHome.total = res.total;
            this.searchHome.pageNumber = res.paging.number;
            this.searchHome.loan = res.userLoan;
            this.setDefaultLoanType();
        }, error => {
            console.log(error);
        });
    }

    setDefaultLoanType(): void {
        this.subscription.push(
            this.store.toggleLoanType.subscribe(res => {
                if (res === null) {
                    if (this.searchHome.loan) {
                        this.searchHome.loan.fha ? this.store.updateToggleLoanType('fha') :
                            this.searchHome.loan.va ? this.store.updateToggleLoanType('va') :
                                this.searchHome.loan.usda ? this.store.updateToggleLoanType('usda') :
                                    this.searchHome.loan.conventional ? this.store.updateToggleLoanType('conventional') :
                                        this.searchHome.loan.homeReady ? this.store.updateToggleLoanType('homeReady') :
                                            this.searchHome.loan.homePossible ? this.store.updateToggleLoanType('homePossible') :
                                                this.store.updateToggleLoanType('null');

                    }
                }
            })
        );
    }

    selectedLoanProgramInQueryParam(queryParam: string): void {
        const data = this.filtersDataToQuery;
        const savedSearchId = this.searchHome.savedSearchId ?
            `${data || queryParam ? '&' : ''}savedSearchId=${this.searchHome.savedSearchId}` : '';
        window.history.replaceState({}, '', `/home/searchHomes?${data}${data ? '&' : ''}loanType=${queryParam}${savedSearchId}`);
    }
}
