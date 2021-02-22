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
  private toggleLoanTypeSubject = new BehaviorSubject<any>(null);
  toggleLoanType = this.toggleLoanTypeSubject.asObservable();
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
}
