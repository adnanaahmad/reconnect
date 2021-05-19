import {AfterViewInit, ChangeDetectorRef, Component, Input, OnDestroy, OnInit} from '@angular/core';
import {HelperService} from '../../../../../../core/helper/helper.service';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {StoreService} from '../../../../../../core/store/store.service';
import {ToastrService} from 'ngx-toastr';
import {CreatePostModel, PostModel} from '../../models/news-feed.model';
import {FormBuilder, Validators} from '@angular/forms';
import {take} from 'rxjs/operators';
import {FeedService} from '../../services/feed.service';
import {ConstantService} from '../../../../../../core/constant/constant.service';

@Component({
  selector: 'app-add-news-feed',
  templateUrl: './add-news-feed.component.html',
  styleUrls: ['./add-news-feed.component.scss']
})
export class AddNewsFeedComponent implements OnInit, AfterViewInit, OnDestroy {
  @Input() edit: PostModel;
  post: CreatePostModel = {} as CreatePostModel;
  constructor(private helper: HelperService,
              private modal: NgbActiveModal,
              public store: StoreService,
              private toaster: ToastrService,
              private fb: FormBuilder,
              private cdr: ChangeDetectorRef,
              private feed: FeedService,
              public constant: ConstantService) { }

  ngOnInit(): void {
    this.helper.setModalPosition();
    this.post.nextScreen = false;
    this.initializeForm();
    this.post.subscription.push(
        this.store.uploadFile.subscribe(res => {
          if (res) {
            this.post.media.push(res);
          }
        })
    );
  }
  ngAfterViewInit(): void {
    if (this.edit){
      this.post.media = [...this.edit.media];
      this.post.form.patchValue({
        title: this.edit.title,
        description: this.edit.description
      });
      this.cdr.detectChanges();
    }
  }
  ngOnDestroy(): void {
    this.store.updateUploadFile(null);
    this.post.subscription.forEach(x => x.unsubscribe());
  }

  initializeForm(): void {
    this.post.subscription = [];
    this.post.media = [];
    this.post.form = this.fb.group({
      title: [null, Validators.required],
      description: [null],
      media: [null],
      contentType: [this.constant.feedContentType.CUSTOM],
      type: ['news-article']
    });
  }
  uploadImageFile(file): void {
    const validImageTypes = ['image/gif', 'image/jpeg', 'image/png', 'image/jpg'];
    file = file.target.files.item(0);
    validImageTypes.includes(file.type) ? this.helper.uploadFile(file, 'image') : this.toaster.error(`Valid image formats: gif, jpg, jpeg and png`);
  }
  uploadVideoFile(file): void {
    const validVideoTypes = ['video/mp4', 'video/ogg', 'video/webm'];
    file = file.target.files.item(0);
    validVideoTypes.includes(file.type) ? this.helper.uploadFile(file, 'video') : this.toaster.error(`Valid video formats: mp4, ogg and webm`);
  }
  onSubmit(): void{
    if (this.customValidation) {
      (this.edit ? this.feed.updatePost({...this.post.form.value, media: this.post.media}, this.edit._id) :
          this.feed.createPost({...this.post.form.value, media: this.post.media})).pipe(take(1)).subscribe(res => {
        this.modal.close({status: 'yes', data: {...res.result, createdBy: this.store.getUserData()}});
        this.toaster.success(`${this.edit ? 'Post Edited' : 'Post Created'}`);
      }, error => {
        this.helper.handleApiError(error, `Failed to ${this.edit ? 'edit' : 'create'} post`);
      });
    } else {
      this.errorHandling();
    }
  }
  errorHandling(): void{
        this.toaster.error(`No description or media attached`);
  }
  get customValidation(): boolean{
        return this.post.media.length > 0 || this.post.form.get('description').value;
  }
  close(): void{
    this.modal.close({status: 'no'});
  }
  goToCreatePost(): void{
    this.post.nextScreen = false;
  }
  goToAddExternalLink(): void{
      this.post.media.length < 6 ? this.post.nextScreen = true :
          this.toaster.error(`Not more than 6 files can be posted`);
  }
  addUrl(data): void{
    this.post.media.push(data);
    this.goToCreatePost();
  }
  removeMediaFile(index: number): void{
    this.post.media.splice(index, 1);
  }
}
