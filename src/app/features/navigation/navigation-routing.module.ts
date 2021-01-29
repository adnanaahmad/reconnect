import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {NavigationComponent} from './components/navigation/navigation.component';
import {AuthGuard} from '../../core/authGuard/auth.guard';
import {RoleGuard} from '../../core/roleGuard/role.guard';


const routes: Routes = [{
  path: '',
  component: NavigationComponent,
  canActivate: [AuthGuard],
  children: [
    {
      path: 'calendar',
      loadChildren: () => import('../roles/common/calendar/calendar.module').then(m => m.CalendarModule),
      canLoad: [RoleGuard]
    },
    {
      path: 'profile',
      loadChildren: () => import('../roles/common/profile/profile.module').then(m => m.ProfileModule)
    },
    {
      path: 'teamMessageBoard',
      loadChildren: () => import('../roles/common/team-message-board/team-message-board.module').then(m => m.TeamMessageBoardModule),
      canLoad: [RoleGuard]
    },
    {
      path: 'myLoanDetails',
      loadChildren: () => import('../roles/buyer/my-loan-details/my-loan-details.module').then(m => m.MyLoanDetailsModule),
      canLoad: [RoleGuard]
    },
    { path: 'newsFeed',
      loadChildren: () => import('../roles/common/news-feed/news-feed.module').then(m => m.NewsFeedModule),
      canLoad: [RoleGuard]
    },
    {
      path: 'preApprovalHistory',
      loadChildren: () => import('../roles/buyer/pre-approval-history/pre-approval-history.module').then(m => m.PreApprovalHistoryModule),
      canLoad: [RoleGuard]
    },
    {
      path: 'savedSearches',
      loadChildren: () => import('../roles/buyer/saved-searches/saved-searches.module').then(m => m.SavedSearchesModule),
      canLoad: [RoleGuard]
    },
    {
      path: 'favorites',
      loadChildren: () => import('../roles/buyer/favorites/favorites.module').then(m => m.FavoritesModule),
      canLoad: [RoleGuard]
    },
    {
      path: 'homeBuyingDashboard',
      loadChildren: () => import('../roles/buyer/home-buying-dashboard/home-buying-dashboard.module').then(m => m.HomeBuyingDashboardModule),
      canLoad: [RoleGuard]
    },
    {
      path: 'searchHomes',
      loadChildren: () => import('../roles/common/search-homes/search-homes.module').then(m => m.SearchHomesModule),
      canLoad: [RoleGuard]
    },
    {
      path: 'calculator',
      loadChildren: () => import('../roles/common/calculator/calculator.module').then(m => m.CalculatorModule),
      canLoad: [RoleGuard]
    },
    {
      path: 'homeBuying101',
      loadChildren: () => import('../roles/common/home-buying101/home-buying101.module').then(m => m.HomeBuying101Module),
      canLoad: [RoleGuard]
    },
    { path: 'professionalDirectory',
      loadChildren: () => import('../roles/common/professional-directory/professional-directory.module').then(m => m.ProfessionalDirectoryModule),
      canLoad: [RoleGuard]
    },
    {
      path: 'todoList',
      loadChildren: () => import('../roles/common/todo-list/todo-list.module').then(m => m.TodoListModule),
      canLoad: [RoleGuard]
    },
    { path: 'lineage',
      loadChildren: () => import('../roles/common/referral-lineage/referral-lineage.module').then(m => m.ReferralLineageModule),
      canLoad: [RoleGuard]
    },
    { path: 'borrowers',
      loadChildren: () => import('../roles/common/borrowers/borrowers.module').then(m => m.BorrowersModule),
      canLoad: [RoleGuard]
    },
    { path: 'dashboard',
      loadChildren: () => import('../roles/common/dashboard/dashboard.module').then(m => m.DashboardModule),
      canLoad: [RoleGuard]
    },
    {
      path: 'borrowerTransactionDetails',
      loadChildren: () => import('../roles/lender/transaction-details/transaction-details.module').then(m => m.TransactionDetailsModule),
      canLoad: [RoleGuard]
    },
    {
      path: 'buyerTransactionDetails',
      loadChildren: () => import('../roles/real-estate-agent/transaction-details/transaction-details.module').then(m => m.TransactionDetailsModule),
      canLoad: [RoleGuard]
    },
    {
      path: 'propertyDetails',
      loadChildren: () => import('../roles/common/property-details/property-details.module').then(m => m.PropertyDetailsModule),
      canLoad: [RoleGuard]
    },

    {
      path: 'quoteRequests',
      loadChildren: () => import('../roles/common/quote-requests/quote-requests.module').then(m => m.QuoteRequestsModule),
      canLoad: [RoleGuard]
    },


  ] },
   ];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class NavigationRoutingModule { }
