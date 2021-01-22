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
  private tokenSubject = new BehaviorSubject<any>(localStorage.getItem('token'));
  token = this.tokenSubject.asObservable();
  private userSubject = new BehaviorSubject<any>(JSON.parse(localStorage.getItem('user')));
  user = this.userSubject.asObservable();
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
}
