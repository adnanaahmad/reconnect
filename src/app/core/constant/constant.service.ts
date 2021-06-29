import { Injectable } from '@angular/core';
import {environment} from '../../../environments/environment';
import {HttpHeaders} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ConstantService {

  constructor() { }
   apiRoutes = {
     signin: `${environment.apiUrl}/user/signin`,
     signup: `${environment.apiUrl}/user/signup`,
     forgotPassword: `${environment.apiUrl}/user/forgot-password`,
     searchReference: `${environment.apiUrl}/user/search-name`,
     editBuyer: `${environment.apiUrl}/user/update`,
     viewBuyer: `${environment.apiUrl}/user/profile`,
     uploadProfilePicture: `${environment.apiUrl}/user/picture`,
     getProfessionals: `${environment.apiUrl}/user/professionals`,
     completeRegistration: `${environment.apiUrl}/user/complete-registration`,
     getTeam: `${environment.apiUrl}/team/my-team`,
     getTeamById: `${environment.apiUrl}/team`,
     addTeamMember: `${environment.apiUrl}/team/add-member`,
     buyerRequestQuote: `${environment.apiUrl}/team/request-quote`,
     professionalRequestQuote: `${environment.apiUrl}/team/my-quotes`,
     acceptRequestQuote: `${environment.apiUrl}/team/accept-quote`,
     rejectRequestQuote: `${environment.apiUrl}/team/reject-quote`,
     removeTeamMember: `${environment.apiUrl}/team/remove-member`,
     homeInspectionDate: `${environment.apiUrl}/loan/set-homeinspection-date`,
     getLoanDetails: `${environment.apiUrl}/loan/my-loan`,
     getHouses: `${environment.apiUrl}/listing/search?market=mlspin&test=true&`,
     searchHomeByName: `${environment.apiUrl}/listing/autocomplete?keyword=`,
     getPropertyDetails: `${environment.apiUrl}/listing/fetch?market=mlspin&listingId=`,
     getBorrowers: `${environment.apiUrl}/team/professional-teams`,
     getBorrowerLoanDetails: `${environment.apiUrl}/loan/borrowers-loan/`,
     saveBorrowerLoanDetails: `${environment.apiUrl}/loan/borrowers-loan`,
     getFavorites: `${environment.apiUrl}/favourite`,
     savedSearches: `${environment.apiUrl}/savedsearch`,
     resetPassword: `${environment.apiUrl}/user/reset-password`,
     getConversation: `${environment.apiUrl}/conversation`,
     getMessages: `${environment.apiUrl}/message`,
     sendPrivateMessage: `${environment.apiUrl}/message/send-private-message`,
     sharePropertyProfessional: `${environment.apiUrl}/message/send-multiple-messages`,
     targetProperty: `${environment.apiUrl}/loan/target-property`,
     professionalDashboard: `${environment.apiUrl}/analytics/dashboard`,
     sendInvite: `${environment.apiUrl}/user/send-invite`,
     getNotifications: `${environment.apiUrl}/notification/get`,
     markAsRead: `${environment.apiUrl}/notification/mark-read`,
     getUnreadMessages: `${environment.apiUrl}/conversation/get-unread`,
     markAsReadConversation: `${environment.apiUrl}/conversation/mark-read`,
     cancelDeal: `${environment.apiUrl}/loan/cancel-deal`,
     getCancelledDeals: `${environment.apiUrl}/loan/inactive-deals`,
     getCalendarEvents: `${environment.apiUrl}/calendar/categories-events`,
     createCalendarEvent: `${environment.apiUrl}/calendar/create-event`,
     createCalendarEventCategory: `${environment.apiUrl}/calendar/create-category`,
     editCalendarEvent: `${environment.apiUrl}/calendar/update-event/`,
     getCalendarCategories: `${environment.apiUrl}/calendar/my-categories`,
     removeEventCategory: `${environment.apiUrl}/calendar/delete-category/`,
     removeEvent: `${environment.apiUrl}/calendar/delete-event/`,
     getEvent: `${environment.apiUrl}/calendar/event-details/`,
     getTodo: `${environment.apiUrl}/todo/get`,
     createTodo: `${environment.apiUrl}/todo/create`,
     updateTodo: `${environment.apiUrl}/todo/update/`,
     updateTodoTags: `${environment.apiUrl}/todo/update-tags/`,
     getFeaturedHomes: `${environment.apiUrl}/listing/featured`,
     getHomeBuyingFeed: `${environment.apiUrl}/feed/home-buying`,
     getNewsFeed: `${environment.apiUrl}/feed/news-feed`,
     getPostById: `${environment.apiUrl}/feed/get/`,
     createPost: `${environment.apiUrl}/feed/create`,
     updatePost: `${environment.apiUrl}/feed/update/`,
     deletePost: `${environment.apiUrl}/feed/delete/`,
     changeEmailRequest: `${environment.apiUrl}/user/change-email-request`,
     changeEmailConfirm: `${environment.apiUrl}/user/change-email-confirm`,
     getComplianceInfo: `${environment.apiUrl}/listing/compliance`,
     startPrivateChat: `${environment.apiUrl}/conversation/start-private`,
     quoteResponse: `${environment.apiUrl}/message/quote-response`,
     createPreApprovalTemplate: `${environment.apiUrl}/preapproval-template/create`,
     updatePreApprovalTemplate: `${environment.apiUrl}/preapproval-template/update/`,
     removePreApprovalTemplate: `${environment.apiUrl}/preapproval-template/delete/`,
     getPreApprovalTemplates: `${environment.apiUrl}/preapproval-template/get`,
     getTemplatesList: `${environment.apiUrl}/preapproval-template/get`,
     generateLetter: `${environment.apiUrl}/preapproval-letter/create`,
     updateTemplateId: `${environment.apiUrl}/loan/update-preapproval-template/`,
     createPreApprovalLetter: `${environment.apiUrl}/preapproval-letter/create`,
     getPreApprovalHistory: `${environment.apiUrl}/preapproval-letter/get`,
     resendEmailVerification: `${environment.apiUrl}/user/resend-complete-registration-email`
   };
  apiMethod = {
    get: 'get',
    post: 'post',
    put: 'put',
    delete: 'delete'
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
      // {
      //   name: 'News Feed',
      //   tooltip: 'My Home Buying Platform',
      //   icon: '/assets/menu-icons/newspaper.svg',
      //   route: '/home/newsFeed',
      //   order: 1
      // },
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
      // {
      //   name: 'Home Buying 101',
      //   tooltip: 'My Home Buying Platform',
      //   icon: '/assets/menu-icons/buy.svg',
      //   route: '/home/homeBuying101',
      //   order: 1
      // },
      {
        name: 'Calendar',
        tooltip: 'My Home Buying Platform',
        icon: '/assets/menu-icons/calendar.svg',
        route: '/home/calendar',
        order: 1
      },
      // {
      //   name: 'Calculators',
      //   tooltip: 'My Home Buying Platform',
      //   icon: '/assets/menu-icons/calculator.svg',
      //   route: '/home/calculator',
      //   order: 1
      // },
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
    //  {
    //    name: 'Pre Approval Letter',
    //    tooltip: 'My Home Buying Platform',
    //    icon: '/assets/menu-icons/approval.svg',
    //    route: '/home/preApprovalLetter',
    //    order: 1
    //  },
    //  {
    //    name: 'News Feed',
    //    tooltip: 'My Home Buying Platform',
    //    icon: '/assets/menu-icons/newspaper.svg',
    //    route: '/home/newsFeed',
    //    order: 1
    // },
    // {
    //   name: 'Professional Directory',
    //   tooltip: 'My Home Buying Platform',
    //   icon: '/assets/menu-icons/directory.svg',
    //   route: '/home/professionalDirectory',
    //   order: 1
    // },
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
    // {
    //   name: 'Calculators',
    //   tooltip: 'My Home Buying Platform',
    //   icon: '/assets/menu-icons/calculator.svg',
    //   route: '/home/calculator',
    //   order: 1
    // },
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
    // {
    //   name: 'News Feed',
    //   tooltip: 'My Home Buying Platform',
    //   icon: '/assets/menu-icons/newspaper.svg',
    //   route: '/home/newsFeed',
    //   order: 1
    // },
    {
      name: 'Search Homes',
      tooltip: 'My Home Buying Platform',
      icon: '/assets/menu-icons/address.svg',
      route: '/home/searchHomes',
      order: 1
    },
    // {
    //   name: 'Reconnect University',
    //   tooltip: 'My Home Buying Platform',
    //   icon: '/assets/menu-icons/university-reconnect.svg',
    //   route: '/home/homeBuying101',
    //   order: 1
    // },
    // {
    //   name: 'Professional Directory',
    //   tooltip: 'My Home Buying Platform',
    //   icon: '/assets/menu-icons/directory.svg',
    //   route: '/home/professionalDirectory',
    //   order: 1
    // },
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
    // {
    //   name: 'Calculators',
    //   tooltip: 'My Home Buying Platform',
    //   icon: '/assets/menu-icons/calculator.svg',
    //   route: '/home/calculator',
    //   order: 1
    // },
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
    // {
    //   name: 'News Feed',
    //   tooltip: 'My Home Buying Platform',
    //   icon: '/assets/menu-icons/newspaper.svg',
    //   route: '/home/newsFeed',
    //   order: 1
    // },
    // {
    //   name: 'Professional Directory',
    //   tooltip: 'My Home Buying Platform',
    //   icon: '/assets/menu-icons/directory.svg',
    //   route: '/home/professionalDirectory',
    //   order: 1
    // },
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
    // {
    //   name: 'News Feed',
    //   tooltip: 'My Home Buying Platform',
    //   icon: '/assets/menu-icons/newspaper.svg',
    //   route: '/home/newsFeed',
    //   order: 1
    // },
    // {
    //   name: 'Professional Directory',
    //   tooltip: 'My Home Buying Platform',
    //   icon: '/assets/menu-icons/directory.svg',
    //   route: '/home/professionalDirectory',
    //   order: 1
    // },
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
    },
    pink: {
      colorIcon: '/assets/calendar-icons/pink.svg', color: '#FFC7FA', textColor: '#f756e8', title: 'Invited Events'
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
      preApprovalHistory: true,
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
      'borrowerTransactionDetails/:id': false,
      'buyerTransactionDetails/:id': false,
      'propertyDetails/:id': true,
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
      'borrowerTransactionDetails/:id': true,
      'buyerTransactionDetails/:id': false,
      'propertyDetails/:id': true,
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
      'borrowerTransactionDetails/:id': false,
      'buyerTransactionDetails/:id': true,
      'propertyDetails/:id': true,
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
      'borrowerTransactionDetails/:id': false,
      'buyerTransactionDetails/:id': true,
      'propertyDetails/:id': true,
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
      'borrowerTransactionDetails/:id': false,
      'buyerTransactionDetails/:id': false,
      'propertyDetails/:id': true,
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
      'borrowerTransactionDetails/:id': false,
      'buyerTransactionDetails/:id': false,
      'propertyDetails/:id': true,
      quoteRequests: true
    },
  };
  chatMessageType = {
    MESSAGE_TYPE_TEXT: 'text',
    MESSAGE_TYPE_TEXT_WITH_FILE: 'textWithFile',
    MESSAGE_TYPE_LOG_PROFESSIONAL_ADDED_TO_TEAM: 'logProfessionalAddedToTeam',
    MESSAGE_TYPE_LOG_PROFESSIONAL_REMOVED_FROM_TEAM: 'logProfessionalRemovedFromTeam',
    MESSAGE_TYPE_SHARE_PROPERTY: 'shareProperty',
    MESSAGE_TYPE_BOOK_PROPERTY: 'bookProperty',
    MESSAGE_TYPE_LOG_PROFESSIONAL_ACCEPT_QUOTE_REQUEST: 'logProfessionalAcceptQuoteRequest',
    MESSAGE_TYPE_QUOTE: 'quote',
  };
  conversationType = {
    PRIVATE: 'private',
    GROUP: 'group'
  };
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
  roleArray = ['buyer', 'seller', 'lender', 'realEstateAgent', 'attorney', 'homeInspector', 'insuranceAgent'];
  loanStatusObject = {
    APPLICATION: 'application',
    PRE_APPROVED: 'preApproved',
    ACCEPTED_OFFER: 'acceptedOffer',
    UNDERWRITING: 'underwriting',
    APPROVED_WITH_CONDITIONS: 'approvedWithConditions',
    CLEARED_TO_CLOSE: 'clearedToClose',
    CLOSED: 'closed'
  };
  loanStatus = [
      this.loanStatusObject.APPLICATION,
      this.loanStatusObject.PRE_APPROVED,
      this.loanStatusObject.ACCEPTED_OFFER,
      this.loanStatusObject.UNDERWRITING,
      this.loanStatusObject.APPROVED_WITH_CONDITIONS,
      this.loanStatusObject.CLEARED_TO_CLOSE,
      this.loanStatusObject.CLOSED
  ];
  homeBuyingProcessStatusIndex = {
    application: 0,
    preApproved: 1,
    acceptedOffer: 2,
    underwriting: 3,
    approvedWithConditions: 4,
    clearedToClose: 5,
    closed: 6,
  };
  borrowersStatus = ['Pending', 'Application', 'Pre-Approved', 'Potential', 'Closed', 'Cancelled'];
  borrowersStatusObject = {
    Pending: ['pending'],
    Application: [this.loanStatusObject.APPLICATION],
    'Pre-Approved': [this.loanStatusObject.PRE_APPROVED],
    Potential: [
      this.loanStatusObject.ACCEPTED_OFFER,
      this.loanStatusObject.UNDERWRITING,
      this.loanStatusObject.APPROVED_WITH_CONDITIONS,
      this.loanStatusObject.CLEARED_TO_CLOSE,
    ],
    Closed: [this.loanStatusObject.CLOSED],
    Cancelled: ['cancelled']
  };
  quoteRequestStatus = {
    PENDING: 'pending',
    ACCEPTED: 'accepted',
    REJECTED: 'rejected',
    TEAM: 'team'
  };
  RESPONSE_ERRORS = {
    BAD_REQUEST: 'BAD_REQUEST',
    SERVER_SIDE_ERROR: 'SERVER_SIDE_ERROR',
    CLIENT_UNAUTHORIZED: 'CLIENT_UNAUTHORIZED',
    NOT_FOUND: 'NOT_FOUND',
    EMAIL_ALREADY_EXISTS: 'EMAIL_ALREADY_EXISTS',
    MINIMUM_PASS_LENGTH: 'MINIMUM_PASS_LENGTH',
    MALFORMED_EMAIL: 'MALFORMED_EMAIL',
    INVALID_ROLE: 'INVALID_ROLE',
    NO_ACCOUNT_FOUND: 'NO_ACCOUNT_FOUND',
    INVALID_PASSWORD: 'INVALID_PASSWORD',
    INVALID_USER_REFERRAL_TYPE: 'INVALID_USER_REFERRAL_TYPE',
    INVALID_USER_REFERRER_ID: 'INVALID_USER_REFERRER_ID',
    INVALID_NAME: 'INVALID_NAME',
    MINIMUM_SEARCH_NAME_QUERY_LENGTH: 'MINIMUM_SEARCH_NAME_QUERY_LENGTH',
    USER_REGISTRATION_NOT_COMPLETE: 'USER_REGISTRATION_NOT_COMPLETE'
  };
  fixedExpensesType = {
    LENDER_FEE: 'lenderFee',
    TITLE_FEE: 'titleFee'
  };
  NOTIFICATION_TYPE = {
    ALL_LOAN_PROCESS_UPDATED: 'all_loan-process-updated',
    BUYER_TARGET_PROPERTY_SET: 'buyer_target-property-set',
    BUYER_LENDER_UPDATED_LOAN: 'buyer_lender-updated-loan',
    LENDER_BUYER_UPDATED_LOAN: 'lender_buyer-updated-loan',
    PROFESSIONALS_ADDED_TO_TEAM: 'professionals_added-to-team',
    PROFESSIONALS_REMOVED_FROM_TEAM: 'professionals_removed-from-team',
    PROFESSIONALS_NEW_QUOTE_REQUEST: 'professionals_new-quote-request',
    BUYER_QUOTE_REQUEST_ACCEPTED: 'buyer_quote-request-accepted',
    BUYER_QUOTE_REQUEST_REJECTED: 'buyer_quote-request-rejected',
    ALL_NEW_MESSAGE: 'all_new-message',
    BUYER_IMPORTANT_DATE_UPDATED: 'buyer_important-date-updated',
    LENDER_TARGET_PROPERTY_SET: 'lender_target-property-set',
    ALL_CALENDAR_EVENT_CREATED: 'all_calendar-event-created'
  };
  TODO_FILTERS = {
    ALL: 'all',
    PRIORITY: 'priority',
    STARRED: 'starred',
    DONE: 'done',
    DELETED: 'deleted',
  };
  SORT_PAYMENT = {
    none: null,
    'high to low': 'desc',
    'low to high': 'asc'
  };
  LANDING_MENU = [
    {
      name: 'Home',
      route: '/homePage',
    },
    {
      name: 'About',
      route: '/about',
    },
    {
      name: 'Buy a home',
      route: '/buyHome',
    },
    {
      name: 'Sell a home',
      route: '/sellHome',
    },
    {
      name: 'Become an agent',
      route: '/becomeAgent',
    }
  ];
  mediaType = {
    IMAGE: 'image',
    VIDEO: 'video',
    IFRAME: 'iframe'
  };
  feedContentType = {
    CUSTOM: 'custom-post',
    PROPERTY: 'property-post'
  };
  multiUnitInfo = {
    xf_levels_ : '# of Levels' ,
    xf_flrs_: '# of Floors' ,
    xf_rms_: '# of Rooms' ,
    xf_bedrms_: '# of Bedrooms',
    xf_f_bths_: '# of Full Baths' ,
    xf_h_bths_: '# of Half Baths',
    'defaultMarketRent.xf_rent': 'Rent',
    xf_app_dscrp_: 'Appliances',
    xf_hea_dscrp_: 'Heating' ,
    xf_lease_ : 'Lease',
  };
  loanType = {
    FHA: 'fha' ,
    CONVENTIONAL: 'conventional',
    HOME_POSSIBLE: 'homePossible',
    HOME_READY: 'homeReady',
    VA: 'va',
    USDA: 'usda',
  };
}
