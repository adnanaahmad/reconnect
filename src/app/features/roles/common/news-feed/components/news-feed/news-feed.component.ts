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
                private toaster: ToastrService) {
        config.container = 'app-news-feed';
        config.centered = true;
    }

    ngOnInit(): void {
        this.getNewsFeed();
    }

    getNewsFeed(): void {
        this.store.updateProgressBarLoading(true);
        this.feed.getNewsFeed().pipe(take(1)).subscribe(res => {
            this.newsFeed = res.result;
            console.log('news feed', res);
            //this.topNews.posts = res.result.adminPosts;
            this.store.updateProgressBarLoading(false);
        }, error => {
            this.helper.handleApiError(error, 'Failed to fetch news feed');
            this.store.updateProgressBarLoading(false);
        });
    }

    removePost(post: PostModel, index: number): void {
        this.feed.removePost(post._id).pipe(take(1)).subscribe(res => {
            this.newsFeed.newsFeed.splice(index, 1);
            this.toaster.success(`Post Deleted`);
        }, error => {
            this.helper.handleApiError(error, 'Failed to delete post');
        });
    }

    addNewsFeed(): void {
        const modalRef = this.modalService.open(AddNewsFeedComponent);
        modalRef.result.then((result) => {
            if (result.status === 'yes') {
                this.newsFeed.newsFeed.unshift(result.data);
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
                this.newsFeed.newsFeed[index] = result.data;
            }
        }, error => {
            //console.log(error);
        });
    }
}
