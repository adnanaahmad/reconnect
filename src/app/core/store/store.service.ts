import { Injectable } from '@angular/core';
import {BehaviorSubject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StoreService {

  private savedSearchData = new BehaviorSubject<any>(1);
  savedSearch = this.savedSearchData.asObservable();
  private toggleMoreFilterModal = new BehaviorSubject<any>(false);
  toggleMoreFilter = this.toggleMoreFilterModal.asObservable();
  private toggleNotificationModal = new BehaviorSubject<any>(false);
  toggleNotification = this.toggleNotificationModal.asObservable();
  private roleSubject = new BehaviorSubject<any>(null);
  role = this.roleSubject.asObservable();
  private userDataSubject = new BehaviorSubject<any>(null);
  userData = this.userDataSubject.asObservable();
  constructor() { }

  updateSavedSearch(data: any): void {
    this.savedSearchData.next(data);
  }
  updateToggleMoreFilter(data: boolean): void{
    this.toggleMoreFilterModal.next(data);
  }
  updateToggleNotification(data: boolean): void{
    this.toggleNotificationModal.next(data);
  }
  setRole(data): void{
    this.roleSubject.next(data);
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
}
