import { Injectable } from '@angular/core';
import {CanLoad, Route, UrlSegment, UrlTree, Router} from '@angular/router';
import { Observable } from 'rxjs';
import {ConstantService} from '../constant/constant.service';
import {StoreService} from '../store/store.service';

@Injectable({
  providedIn: 'root'
})
export class RoleGuard implements CanLoad {
  constructor(private constant: ConstantService, private store: StoreService, private router: Router) {}
  canLoad(
    route: Route,
    segments: UrlSegment[]): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    if (!localStorage.getItem('token')) {
      this.router.navigateByUrl('/login').then();
      return false;
    }
    const role = JSON.parse(localStorage.getItem('user')).role;
    return this.constant.permission[role][route.path];
  }
}
