import {Component, OnInit} from '@angular/core';
import {NewsFeedModel, PostModel} from '../../models/news-feed.model';
import {NgbModal, NgbModalConfig} from '@ng-bootstrap/ng-bootstrap';
import {AddNewsFeedComponent} from '../../popups/add-news-feed/add-news-feed.component';
import {StoreService} from '../../../../../../core/store/store.service';
import {ConstantService} from '../../../../../../core/constant/constant.service';
import {FeedService} from '../../services/feed.service';
import {take} from 'rxjs/operators';
import {HelperService} from '../../../../../../core/helper/helper.service';
import {ToastrService} from 'ngx-toastr';
import {Location} from '@angular/common';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
    selector: 'app-news-feed',
    templateUrl: './news-feed.component.html',
    styleUrls: ['./news-feed.component.scss']
})
export class NewsFeedComponent implements OnInit {
    newsFeed: NewsFeedModel = {} as NewsFeedModel;

    constructor(private modalService: NgbModal,
                private config: NgbModalConfig,
                public store: StoreService,
                public constant: ConstantService,
                private feed: FeedService,
                public helper: HelperService,
                private toaster: ToastrService,
                public location: Location,
                private activatedRoute: ActivatedRoute,
                private router: Router) {
        config.container = 'app-news-feed';
        config.centered = true;
    }

    ngOnInit(): void {
        this.newsFeed.screenOne = true;
        this.newsFeed.newsFeedPageNumber = 1;
        this.newsFeed.topNewsPageNumber = 1;
        this.newsFeed.subscription = [];
        this.newsFeed.subscription.push(
            this.activatedRoute.queryParams.subscribe(params => {
                if (params.viewPost){
                    this.newsFeed.screenOne = false;
                    this.getPostById(params.viewPost);
                } else {
                    this.newsFeed.screenOne = true;
                    this.getNewsFeed();
                }
            })
        );
    }

    getNewsFeed(): void {
        this.store.updateProgressBarLoading(true);
        this.feed.getNewsFeed(`?newsFeedPageNumber=${this.newsFeed.newsFeedPageNumber}&topNewsPageNumber=
        ${this.newsFeed.topNewsPageNumber}`).pipe(take(1)).subscribe(res => {
            this.newsFeed.newsFeed = res.result.newsFeed;
            this.newsFeed.adminPosts = res.result.adminPosts;
            this.newsFeed.newsFeedCount = res.result.newsFeedCount;
            this.newsFeed.adminPostsCount = res.result.adminPostsCount;
            //console.log('news feed', res);
            this.store.updateProgressBarLoading(false);
        }, error => {
            this.helper.handleApiError(error, 'Failed to fetch news feed');
            this.store.updateProgressBarLoading(false);
        });
    }
    getPostById(id): void{
        this.store.updateProgressBarLoading(true);
        this.feed.getPostById(id).pipe(take(1)).subscribe(res => {
            this.newsFeed.post = res.result;
            //console.log('post', res);
            this.store.updateProgressBarLoading(false);
        }, error => {
            this.helper.handleApiError(error, 'Failed to fetch news feed');
            this.store.updateProgressBarLoading(false);
        });
    }

    removePost(post: PostModel, index: number): void {
        this.feed.removePost(post._id).pipe(take(1)).subscribe(res => {
            index !== -1 ? this.newsFeed.newsFeed.splice(index, 1) : this.newsFeed.post = null;
            this.toaster.success(`Post Deleted`);
            this.newsFeed.newsFeedCount = this.newsFeed.newsFeedCount - 1;
        }, error => {
            this.helper.handleApiError(error, 'Failed to delete post');
        });
    }

    addNewsFeed(): void {
        const modalRef = this.modalService.open(AddNewsFeedComponent);
        modalRef.result.then((result) => {
            if (result.status === 'yes') {
                this.newsFeed.newsFeed.unshift(result.data);
                this.newsFeed.newsFeedCount = this.newsFeed.newsFeedCount + 1;
            }
        }, error => {
            //console.log(error);
        });
    }

    editPost(post: PostModel, index: number): void {
        const modalRef = this.modalService.open(AddNewsFeedComponent);
        modalRef.componentInstance.edit = post;
        modalRef.result.then((result) => {
            if (result.status === 'yes') {
                index !== -1 ? this.newsFeed.newsFeed[index] = result.data :
                this.newsFeed.post = result.data;
            }
        }, error => {
            //console.log(error);
        });
    }
    navigateToPost(id): void{
        this.router.navigateByUrl('home/newsFeed?viewPost=' + id);
    }
    loadMore(bool): void{
        const data = bool ? `?newsFeedPageNumber=${this.newsFeed.newsFeedPageNumber + 1}` : `?topNewsPageNumber=
        ${this.newsFeed.topNewsPageNumber + 1}`;
        this.feed.getNewsFeed(data).pipe(take(1)).subscribe(res => {
            if (bool){
                this.newsFeed.newsFeed = [...this.newsFeed.newsFeed, ...res.result.newsFeed];
                this.newsFeed.newsFeedPageNumber = this.newsFeed.newsFeedPageNumber + 1;
                this.newsFeed.newsFeedCount = res.result.newsFeedCount;

            } else {
                this.newsFeed.adminPosts = [...this.newsFeed.adminPosts, ...res.result.adminPosts];
                this.newsFeed.topNewsPageNumber = this.newsFeed.topNewsPageNumber + 1;
                this.newsFeed.adminPostsCount = res.result.adminPostsCount;
            }
        }, error => {
            this.helper.handleApiError(error, 'Failed to fetch news feed');
        });
    }
}
