import { Injectable } from '@angular/core';
import {BehaviorSubject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StoreService {

  private toggleMoreFilterModal = new BehaviorSubject<any>(false);
  toggleMoreFilter = this.toggleMoreFilterModal.asObservable();
  private toggleNotificationModal = new BehaviorSubject<any>(false);
  toggleNotification = this.toggleNotificationModal.asObservable();
  public roleSubject = new BehaviorSubject<any>(null);
  private userDataSubject = new BehaviorSubject<any>(null);
  userData = this.userDataSubject.asObservable();
  public toggleLoanTypeSubject = new BehaviorSubject<any>(null);
  toggleLoanType = this.toggleLoanTypeSubject.asObservable();
  private dashboardDateSubject = new BehaviorSubject<any>(null);
  dashboardDate = this.dashboardDateSubject.asObservable();
  private borrowersStatusSubject = new BehaviorSubject<any>(null);
  borrowersStatus = this.borrowersStatusSubject.asObservable();
  constructor() { }

  updateToggleMoreFilter(data: boolean): void{
    this.toggleMoreFilterModal.next(data);
  }
  updateToggleNotification(data: boolean): void{
    this.toggleNotificationModal.next(data);
  }
  getToken(): string{
    return localStorage.getItem('token');
  }
  getLocationApiToken(): string{
    return localStorage.getItem('locationApiToken');
  }
  getUserData(): any{
    return JSON.parse(localStorage.getItem('user'));
  }
  updateUserData(data): void{
    this.userDataSubject.next(data);
  }
  get role(): string {
    return this.roleSubject.value;
  }
  updateToggleLoanType(data): void{
    this.toggleLoanTypeSubject.next(data);
  }
  get userId(): string{
    return JSON.parse(localStorage.getItem('user'))._id;
  }
  updateDashboardDate(data): void{
    this.dashboardDateSubject.next(data);
  }
  updateBorrowersStatus(data): void{
    this.borrowersStatusSubject.next(data);
  }
}
