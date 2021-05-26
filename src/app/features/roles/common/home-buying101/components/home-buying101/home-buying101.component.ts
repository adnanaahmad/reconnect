import { Component, OnInit } from '@angular/core';
import {HomeBuyingModel} from '../../models/home-buying101.model';
import {DomSanitizer} from '@angular/platform-browser';
import {take} from 'rxjs/operators';
import {HomeBuyingService} from '../../services/home-buying.service';
import {StoreService} from '../../../../../../core/store/store.service';
import {HelperService} from '../../../../../../core/helper/helper.service';
import {ConstantService} from '../../../../../../core/constant/constant.service';
import {ActivatedRoute, Router} from '@angular/router';
import {Location} from '@angular/common';

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
              public constant: ConstantService,
              private activatedRoute: ActivatedRoute,
              private router: Router,
              public location: Location,) {
  }

  ngOnInit(): void {
    this.home.screenOne = true;
    this.home.subscription = [];
    this.home.subscription.push(
        this.activatedRoute.queryParams.subscribe(params => {
          if (params.viewResource){
            this.home.screenOne = false;
            this.getPostById(params.viewResource);
          } else {
            this.home.screenOne = true;
            this.getHomeBuyingResources();
          }
        })
    );
  }
  getHomeBuyingResources(): void{
    this.store.updateProgressBarLoading(true);
    this.homeBuying.getHomeBuyingFeed().pipe(take(1)).subscribe(res =>{
      this.home.blog = res.result.blog;
      this.home.videos = res.result.videos;
      this.home.resources = res.result.resources;
      this.store.updateProgressBarLoading(false);
    }, error => {
      this.helper.handleApiError(error, 'Failed to fetch feed');
      this.store.updateProgressBarLoading(false);
    });
  }
  getPostById(id): void{
    this.store.updateProgressBarLoading(true);
    this.homeBuying.getPostById(id).pipe(take(1)).subscribe(res => {
      this.home.post = res.result;
      this.store.updateProgressBarLoading(false);
    }, error => {
      this.helper.handleApiError(error, 'Failed to fetch news feed');
      this.store.updateProgressBarLoading(false);
    });
  }
  navigateToPost(id): void{
    this.router.navigateByUrl('home/homeBuying101?viewResource=' + id);
  }
}
