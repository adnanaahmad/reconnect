import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {NavigationComponent} from './components/navigation/navigation.component';


const routes: Routes = [{
  path: '',
  component: NavigationComponent,
  children: [
    {
      path: 'calendar',
      loadChildren: () => import('../roles/common/calendar/calendar.module').then(m => m.CalendarModule)
    },
    {
      path: 'profile',
      loadChildren: () => import('../roles/common/profile/profile.module').then(m => m.ProfileModule)
    },
    {
      path: 'teamMessageBoard',
      loadChildren: () => import('../roles/common/team-message-board/team-message-board.module').then(m => m.TeamMessageBoardModule)
    },
    {
      path: 'myLoanDetails',
      loadChildren: () => import('../roles/buyer/my-loan-details/my-loan-details.module').then(m => m.MyLoanDetailsModule)
    },
    { path: 'newsFeed',
      loadChildren: () => import('../roles/common/news-feed/news-feed.module').then(m => m.NewsFeedModule)
    },
    {
      path: 'preApprovalHistory',
      loadChildren: () => import('../roles/buyer/pre-approval-history/pre-approval-history.module').then(m => m.PreApprovalHistoryModule)
    },
    {
      path: 'savedSearches',
      loadChildren: () => import('../roles/buyer/saved-searches/saved-searches.module').then(m => m.SavedSearchesModule)
    },
    {
      path: 'favorites',
      loadChildren: () => import('../roles/buyer/favorites/favorites.module').then(m => m.FavoritesModule)
    },
    {
      path: 'homeBuyingDashboard',
      loadChildren: () => import('../roles/buyer/home-buying-dashboard/home-buying-dashboard.module').then(m => m.HomeBuyingDashboardModule)
    },
    {
      path: 'searchHomes',
      loadChildren: () => import('../roles/common/search-homes/search-homes.module').then(m => m.SearchHomesModule)
    },
    {
      path: 'calculator',
      loadChildren: () => import('../roles/common/calculator/calculator.module').then(m => m.CalculatorModule)
    },
    {
      path: 'homeBuying101',
      loadChildren: () => import('../roles/common/home-buying101/home-buying101.module').then(m => m.HomeBuying101Module)
    },
    { path: 'professionalDirectory',
      loadChildren: () => import('../roles/common/professional-directory/professional-directory.module').then(m => m.ProfessionalDirectoryModule)
    },
    {
      path: 'todoList',
      loadChildren: () => import('../roles/common/todo-list/todo-list.module').then(m => m.TodoListModule)
    },
    { path: 'referralLineage',
      loadChildren: () => import('../roles/common/referral-lineage/referral-lineage.module').then(m => m.ReferralLineageModule)
    },
    { path: 'borrowers',
      loadChildren: () => import('../roles/common/borrowers/borrowers.module').then(m => m.BorrowersModule)
    },
    { path: 'dashboard',
      loadChildren: () => import('../roles/common/dashboard/dashboard.module').then(m => m.DashboardModule)
    },
    {
      path: 'borrowerTransactionDetails',
      loadChildren: () => import('../roles/lender/transaction-details/transaction-details.module').then(m => m.TransactionDetailsModule)
    },
    {
      path: 'buyerTransactionDetails',
      loadChildren: () => import('../roles/real-estate-agent/transaction-details/transaction-details.module').then(m => m.TransactionDetailsModule)
    },
    {
      path: 'propertyDetails',
      loadChildren: () => import('../roles/common/property-details/property-details.module').then(m => m.PropertyDetailsModule)
    },

    {
      path: 'quoteRequests',
      loadChildren: () => import('../roles/common/quote-requests/quote-requests.module').then(m => m.QuoteRequestsModule)
    },


  ] },
   ];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class NavigationRoutingModule { }
