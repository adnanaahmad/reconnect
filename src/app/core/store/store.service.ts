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
  private progressBarLoadingSubject = new BehaviorSubject<any>(null);
  progressBarLoading = this.progressBarLoadingSubject.asObservable();
  private newMessageSubject = new BehaviorSubject<any>(false);
  newMessage = this.newMessageSubject.asObservable();
  private unreadNotificationSubject = new BehaviorSubject<any>(false);
  unreadNotification = this.unreadNotificationSubject.asObservable();
  private purchasePriceSubject = new BehaviorSubject<any>(null);
  purchasePrice = this.purchasePriceSubject.asObservable();
  private todoFilterSubject = new BehaviorSubject<any>(null);
  todoFilter = this.todoFilterSubject.asObservable();
  private marketRentValuesSubject = new BehaviorSubject<any>(null);
  marketRentValues = this.marketRentValuesSubject.asObservable();
  private uploadFileSubject = new BehaviorSubject<any>(null);
  uploadFile = this.uploadFileSubject.asObservable();
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
  updateProgressBarLoading(data): void{
    this.progressBarLoadingSubject.next(data);
  }
  updateNewMessage(data): void{
    this.newMessageSubject.next(data);
  }
  updateUnreadNotification(data): void{
    this.unreadNotificationSubject.next(data);
  }
  updatePurchasePrice(data): void{
    this.purchasePriceSubject.next(data);
  }
  updateTodoFilter(data): void{
    this.todoFilterSubject.next(data);
  }
  updateMarketRentValues(data): void{
    this.marketRentValuesSubject.next(data);
  }
  updateUploadFile(data): void{
    this.uploadFileSubject.next(data);
  }
}
