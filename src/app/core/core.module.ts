import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {ConstantService} from './constant/constant.service';
import {StoreService} from './store/store.service';
import {HelperService} from './helper/helper.service';
import {AuthGuard} from './authGuard/auth.guard';



@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ],
  providers: [ ConstantService, StoreService, HelperService, AuthGuard ]
})
export class CoreModule { }
