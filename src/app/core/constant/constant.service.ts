import { Injectable } from '@angular/core';
import {environment} from '../../../environments/environment';
import {HttpHeaders} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ConstantService {

  constructor() { }

   role = {
      BUYER: 'buyer',
      SELLER: 'seller',
      LENDER: 'lender',
      REAL_ESTATE: 'realEstateAgent',
      ATTORNEY: 'attorney',
      HOME_INSPECTOR: 'homeInspector',
      INSURANCE: 'insuranceAgent',
      CONTRACTOR: 'contractor'
    };
  chooseRole = {
    'Real Estate Agent': 'realEstateAgent',
    Attorney : 'attorney',
    Lender: 'lender',
    'Home Inspector': 'homeInspector',
    'Insurance Agent': 'insuranceAgent',
  };
   apiMethod = {
    get: 'get',
    post: 'post',
    put: 'put',
    delete: 'delete'
  };

   apiRoutes = {
     signin: `${environment.apiUrl}/user/signin`,
     signup: `${environment.apiUrl}/user/signup`,
     searchReference: `${environment.apiUrl}/user/search-name`,
     editBuyer: `${environment.apiUrl}/user/update`,
     viewBuyer: `${environment.apiUrl}/user/profile`,
     uploadProfilePicture: `${environment.apiUrl}/user/picture`,
     getProfessionals: `${environment.apiUrl}/user/professionals`,
     completeRegistration: `${environment.apiUrl}/user/complete-registration`,
     getTeam: `${environment.apiUrl}/team/my-team`,
     addTeamMember: `${environment.apiUrl}/team/add-member`,
     removeTeamMember: `${environment.apiUrl}/team/remove-member`,
     getLoanDetails: `${environment.apiUrl}/loan/my-loan`,
     getHouses: `${environment.apiUrl}/listing/search?market=mlspin&test=true&`,
     searchHomeByName: `${environment.apiUrl}/listing/autocomplete?keyword=`
  };
   httpOptions = {
     json: {
       headers: new HttpHeaders({
         'Content-Type':  'application/json',
       })
     },
     image: {
       headers: new HttpHeaders({
         'Content-Type':  'multipart/form-data',
       })
     }
   };
    const; buyer = [{
      name: 'Home Buying Dashboard',
      tooltip: 'My Home Buying Platform',
      icon: '/assets/menu-icons/dashboard.svg',
      route: '/home/homeBuyingDashboard',
      order: 1
      },
      {
      name: 'My loan Details',
      tooltip: 'My Home Buying Platform',
      icon: '/assets/menu-icons/loan.svg',
      route: '/home/myLoanDetails',
      order: 1
      },
      {
        name: 'News Feed',
        tooltip: 'My Home Buying Platform',
        icon: '/assets/menu-icons/newspaper.svg',
        route: '/home/newsFeed',
        order: 1
      },
      {
        name: 'Search Homes',
        tooltip: 'My Home Buying Platform',
        icon: '/assets/menu-icons/address.svg',
        route: '/home/searchHomes',
        order: 1
      },
      {
        name: 'Favorites',
        tooltip: 'My Home Buying Platform',
        icon: '/assets/menu-icons/star.svg',
        route: '/home/favorites',
        order: 1
      },
      {
        name: 'Saved Searches',
        tooltip: 'My Home Buying Platform',
        icon: '/assets/menu-icons/favorite.svg',
        route: '/home/savedSearches',
        order: 1
      },
      // {
      //   name: 'Pre Approval History',
      //   tooltip: 'My Home Buying Platform',
      //   icon: '/assets/menu-icons/wall-clock.svg',
      //   route: '/home/preApprovalHistory',
      //   order: 1
      // },
      {
        name: 'Home Buying 101',
        tooltip: 'My Home Buying Platform',
        icon: '/assets/menu-icons/buy.svg',
        route: '/home/homeBuying101',
        order: 1
      },
      {
        name: 'Calendar',
        tooltip: 'My Home Buying Platform',
        icon: '/assets/menu-icons/calendar.svg',
        route: '/home/calendar',
        order: 1
      },
      {
        name: 'Calculators',
        tooltip: 'My Home Buying Platform',
        icon: '/assets/menu-icons/calculator.svg',
        route: '/home/calculator',
        order: 1
      },
      {
        name: 'Team Message Board',
        tooltip: 'My Home Buying Platform',
        icon: '/assets/menu-icons/chat.svg',
        route: '/home/teamMessageBoard',
        order: 1
      },
      {
        name: 'Logout',
        tooltip: 'My Home Buying Platform',
        icon: '/assets/menu-icons/logout.svg',
        route: '/login',
        order: 1
      },

    ];

   lender = [{
      name: 'Dashboard',
      tooltip: 'Dashboard',
      icon: '/assets/menu-icons/dashboard.svg',
      route: '/home/dashboard',
      order: 1
    },
    {
      name: 'Referral Lineage',
      tooltip: 'My Home Buying Platform',
      icon: '/assets/menu-icons/referral.svg',
      route: '/home/lineage',
      order: 1
    },
    {
      name: 'Borrowers',
      tooltip: 'My Home Buying Platform',
      icon: '/assets/menu-icons/borrower.svg',
      route: '/home/borrowers',
      order: 1
    },
     {
       name: 'News Feed',
       tooltip: 'My Home Buying Platform',
       icon: '/assets/menu-icons/newspaper.svg',
       route: '/home/newsFeed',
       order: 1
    },
    {
      name: 'Professional Directory',
      tooltip: 'My Home Buying Platform',
      icon: '/assets/menu-icons/directory.svg',
      route: '/home/professionalDirectory',
      order: 1
    },
    {
      name: 'Calendar',
      tooltip: 'My Home Buying Platform',
      icon: '/assets/menu-icons/calendar.svg',
      route: '/home/calendar',
      order: 1
    },
     {
       name: 'To Do List',
       tooltip: 'My Home Buying Platform',
       icon: '/assets/menu-icons/todo.svg',
       route: '/home/todoList',
       order: 1
     },
    {
      name: 'Calculators',
      tooltip: 'My Home Buying Platform',
      icon: '/assets/menu-icons/calculator.svg',
      route: '/home/calculator',
      order: 1
    },
    {
      name: 'Team Message Board',
      tooltip: 'My Home Buying Platform',
      icon: '/assets/menu-icons/chat.svg',
      route: '/home/teamMessageBoard',
      order: 1
    },
    {
      name: 'Logout',
      tooltip: 'My Home Buying Platform',
      icon: '/assets/menu-icons/logout.svg',
      route: '/login',
      order: 1
    },

  ];

  realEstateAgent = [{
    name: 'Dashboard',
    tooltip: 'Dashboard',
    icon: '/assets/menu-icons/dashboard.svg',
    route: '/home/dashboard',
    order: 1
  },
    {
      name: 'Referral Lineage',
      tooltip: 'My Home Buying Platform',
      icon: '/assets/menu-icons/referral.svg',
      route: '/home/lineage',
      order: 1
    },
    {
      name: 'Team Dynasty',
      tooltip: 'My Home Buying Platform',
      icon: '/assets/menu-icons/team.svg',
      route: '/home/lineage',
      order: 1
    },
    {
      name: 'News Feed',
      tooltip: 'My Home Buying Platform',
      icon: '/assets/menu-icons/newspaper.svg',
      route: '/home/newsFeed',
      order: 1
    },
    {
      name: 'Search Homes',
      tooltip: 'My Home Buying Platform',
      icon: '/assets/menu-icons/address.svg',
      route: '/home/searchHomes',
      order: 1
    },
    {
      name: 'Reconnect University',
      tooltip: 'My Home Buying Platform',
      icon: '/assets/menu-icons/university-reconnect.svg',
      route: '/home/homeBuying101',
      order: 1
    },
    {
      name: 'Professional Directory',
      tooltip: 'My Home Buying Platform',
      icon: '/assets/menu-icons/directory.svg',
      route: '/home/professionalDirectory',
      order: 1
    },
    {
      name: 'Calendar',
      tooltip: 'My Home Buying Platform',
      icon: '/assets/menu-icons/calendar.svg',
      route: '/home/calendar',
      order: 1
    },
    {
      name: 'To Do List',
      tooltip: 'My Home Buying Platform',
      icon: '/assets/menu-icons/todo.svg',
      route: '/home/todoList',
      order: 1
    },
    {
      name: 'Buyers',
      tooltip: 'My Home Buying Platform',
      icon: '/assets/menu-icons/buyer.svg',
      route: '/home/borrowers',
      order: 1
    },
    {
      name: 'Calculators',
      tooltip: 'My Home Buying Platform',
      icon: '/assets/menu-icons/calculator.svg',
      route: '/home/calculator',
      order: 1
    },
    {
      name: 'Team Message Board',
      tooltip: 'My Home Buying Platform',
      icon: '/assets/menu-icons/chat.svg',
      route: '/home/teamMessageBoard',
      order: 1
    },
    {
      name: 'Logout',
      tooltip: 'My Home Buying Platform',
      icon: '/assets/menu-icons/logout.svg',
      route: '/login',
      order: 1
    },

  ];

  attorney = [{
      name: 'Dashboard',
      tooltip: 'Dashboard',
      icon: '/assets/menu-icons/dashboard.svg',
      route: '/home/dashboard',
      order: 1
    },
    {
      name: 'Referral Lineage',
      tooltip: 'My Home Buying Platform',
      icon: '/assets/menu-icons/referral.svg',
      route: '/home/lineage',
      order: 1
    },
    {
      name: 'Borrowers',
      tooltip: 'My Home Buying Platform',
      icon: '/assets/menu-icons/borrower.svg',
      route: '/home/borrowers',
      order: 1
    },
    {
      name: 'News Feed',
      tooltip: 'My Home Buying Platform',
      icon: '/assets/menu-icons/newspaper.svg',
      route: '/home/newsFeed',
      order: 1
    },
    {
      name: 'Professional Directory',
      tooltip: 'My Home Buying Platform',
      icon: '/assets/menu-icons/directory.svg',
      route: '/home/professionalDirectory',
      order: 1
    },
    {
      name: 'Calendar',
      tooltip: 'My Home Buying Platform',
      icon: '/assets/menu-icons/calendar.svg',
      route: '/home/calendar',
      order: 1
    },
    {
      name: 'To Do List',
      tooltip: 'My Home Buying Platform',
      icon: '/assets/menu-icons/todo.svg',
      route: '/home/todoList',
      order: 1
    },
    {
      name: 'Team Message Board',
      tooltip: 'My Home Buying Platform',
      icon: '/assets/menu-icons/chat.svg',
      route: '/home/teamMessageBoard',
      order: 1
    },
    {
      name: 'Logout',
      tooltip: 'My Home Buying Platform',
      icon: '/assets/menu-icons/logout.svg',
      route: '/login',
      order: 1
    },

  ];

  homeInspector = [{
    name: 'Dashboard',
    tooltip: 'Dashboard',
    icon: '/assets/menu-icons/dashboard.svg',
    route: '/home/dashboard',
    order: 1
  },
    {
      name: 'Quote Requests',
      tooltip: 'My Home Buying Platform',
      icon: '/assets/menu-icons/quote.svg',
      route: '/home/quoteRequests',
      order: 1
    },
    {
      name: 'News Feed',
      tooltip: 'My Home Buying Platform',
      icon: '/assets/menu-icons/newspaper.svg',
      route: '/home/newsFeed',
      order: 1
    },
    {
      name: 'Professional Directory',
      tooltip: 'My Home Buying Platform',
      icon: '/assets/menu-icons/directory.svg',
      route: '/home/professionalDirectory',
      order: 1
    },
    {
      name: 'Calendar',
      tooltip: 'My Home Buying Platform',
      icon: '/assets/menu-icons/calendar.svg',
      route: '/home/calendar',
      order: 1
    },
    {
      name: 'Team Message Board',
      tooltip: 'My Home Buying Platform',
      icon: '/assets/menu-icons/chat.svg',
      route: '/home/teamMessageBoard',
      order: 1
    },
    {
      name: 'Logout',
      tooltip: 'My Home Buying Platform',
      icon: '/assets/menu-icons/logout.svg',
      route: '/login',
      order: 1
    },

  ];

  eventColorDetails = {
    purple: {
      colorIcon: '/assets/calendar-icons/purple.svg', color: '#E1D9FF', textColor: '#8261FF'
    },
    orange: {
      colorIcon: '/assets/calendar-icons/orange.svg', color: '#FFDDC2', textColor: '#F1954D'
    },
    yellow: {
      colorIcon: '/assets/calendar-icons/yellow.svg', color: '#FFFBC7', textColor: '#D5C932'
    },
    green: {
      colorIcon: '/assets/calendar-icons/green.svg', color: '#D3FFC8', textColor: '#66C94D'
    },
    blue: {
      colorIcon: '/assets/calendar-icons/blue.svg', color: '#CBFFF9', textColor: '#37DFCC'
    }
  };
  searchFilters = {
    baths: 'Baths',
    beds: 'Beds',
    listingStatus: 'Listing Status',
    price: 'Price',
    propertyType: 'Property Type',
    moreFilters: 'More Filters',
    5: '5+',
    4: '4+',
    3: '3+',
    2: '2+',
    1: '1+',
    existingHomes: 'Existing Homes',
    fiftyFivePlusCommunity: '55+ Community',
    foreclosures: 'Foreclosures',
    hideForeclosures: 'Hide Foreclosures',
    hidePendingContingent: 'Hide Pending / Contingent',
    newConstruction: 'New Construction',
    openHouse: 'Open House',
    priceReduced: 'Price Reduced',
    any: 'Any',
    condo: 'Condo',
    farm: 'Farm',
    land: 'Land',
    mobile: 'Mobile',
    multiFamily: 'Multi Family',
    singleFamily: 'Single Family',
    basement: 'Basement',
    swimmingPool: 'Swimming Pool',
    attic: 'Attic',
    waterFront: 'Water Front',
  };
  aboutUs = {
    'Professional or Friend Reference': 'user',
    'Facebook Advertisement': 'facebook',
    Twitter: 'twitter',
    'Youtube Videos(Channel)': 'youtube',
    Website: 'website',
    Other: 'other'
  };
  permission = {
    buyer: {
      calendar: true,
      teamMessageBoard: true,
      myLoanDetails: true,
      newsFeed: true,
      preApprovalHistory: false,
      savedSearches: true,
      favorites: true,
      homeBuyingDashboard: true,
      searchHomes: true,
      calculator: true,
      homeBuying101: true,
      professionalDirectory: false,
      todoList: false,
      lineage: false,
      borrowers: false,
      dashboard: false,
      borrowerTransactionDetails: false,
      buyerTransactionDetails: false,
      propertyDetails: true,
      quoteRequests: false
    },
    lender: {
      calendar: true,
      teamMessageBoard: true,
      myLoanDetails: false,
      newsFeed: true,
      preApprovalHistory: false,
      savedSearches: false,
      favorites: false,
      homeBuyingDashboard: false,
      searchHomes: false,
      calculator: true,
      homeBuying101: false,
      professionalDirectory: true,
      todoList: true,
      lineage: true,
      borrowers: true,
      dashboard: true,
      borrowerTransactionDetails: true,
      buyerTransactionDetails: false,
      propertyDetails: true,
      quoteRequests: false
    },
    realEstateAgent: {
      calendar: true,
      teamMessageBoard: true,
      myLoanDetails: false,
      newsFeed: true,
      preApprovalHistory: false,
      savedSearches: false,
      favorites: false,
      homeBuyingDashboard: false,
      searchHomes: true,
      calculator: true,
      homeBuying101: true,
      professionalDirectory: true,
      todoList: true,
      lineage: true,
      borrowers: true,
      dashboard: true,
      borrowerTransactionDetails: false,
      buyerTransactionDetails: true,
      propertyDetails: true,
      quoteRequests: false

    },
    attorney: {
      calendar: true,
      teamMessageBoard: true,
      myLoanDetails: false,
      newsFeed: true,
      preApprovalHistory: false,
      savedSearches: false,
      favorites: false,
      homeBuyingDashboard: false,
      searchHomes: false,
      calculator: false,
      homeBuying101: false,
      professionalDirectory: true,
      todoList: true,
      lineage: true,
      borrowers: true,
      dashboard: true,
      borrowerTransactionDetails: false,
      buyerTransactionDetails: true,
      propertyDetails: true,
      quoteRequests: false
    },
    insuranceAgent: {
      calendar: true,
      teamMessageBoard: true,
      myLoanDetails: false,
      newsFeed: true,
      preApprovalHistory: false,
      savedSearches: false,
      favorites: false,
      homeBuyingDashboard: false,
      searchHomes: false,
      calculator: false,
      homeBuying101: false,
      professionalDirectory: true,
      todoList: false,
      lineage: false,
      borrowers: false,
      dashboard: true,
      borrowerTransactionDetails: false,
      buyerTransactionDetails: false,
      propertyDetails: true,
      quoteRequests: true
    },
    homeInspector: {
      calendar: true,
      teamMessageBoard: true,
      myLoanDetails: false,
      newsFeed: true,
      preApprovalHistory: false,
      savedSearches: false,
      favorites: false,
      homeBuyingDashboard: false,
      searchHomes: false,
      calculator: false,
      homeBuying101: false,
      professionalDirectory: true,
      todoList: false,
      lineage: false,
      borrowers: false,
      dashboard: true,
      borrowerTransactionDetails: false,
      buyerTransactionDetails: false,
      propertyDetails: true,
      quoteRequests: true
    },
  };
}
