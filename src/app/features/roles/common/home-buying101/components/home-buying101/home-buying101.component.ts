import { Component, OnInit } from '@angular/core';
import {HomeBuyingModel} from '../../models/home-buying101.model';
import {DomSanitizer} from '@angular/platform-browser';
import {take} from 'rxjs/operators';
import {HomeBuyingService} from '../../services/home-buying.service';
import {StoreService} from '../../../../../../core/store/store.service';
import {HelperService} from '../../../../../../core/helper/helper.service';
import {ConstantService} from '../../../../../../core/constant/constant.service';

@Component({
  selector: 'app-home-buying101',
  templateUrl: './home-buying101.component.html',
  styleUrls: ['./home-buying101.component.scss']
})
export class HomeBuying101Component implements OnInit {
  home: HomeBuyingModel = {} as HomeBuyingModel;

  constructor(private homeBuying: HomeBuyingService,
              public store: StoreService,
              private helper: HelperService,
              public constant: ConstantService) {
  }

  ngOnInit(): void {
    this.store.updateProgressBarLoading(true);
    this.homeBuying.getHomeBuyingFeed().pipe(take(1)).subscribe(res =>{
      this.home = res.result;
      console.log(this.homeBuying);
      this.store.updateProgressBarLoading(false);
    }, error => {
      this.helper.handleApiError(error, 'Failed to fetch feed');
      this.store.updateProgressBarLoading(false);
    });
  }
}
