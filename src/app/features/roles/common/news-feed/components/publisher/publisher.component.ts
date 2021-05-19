import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {ConstantService} from '../../../../../../core/constant/constant.service';
import {StoreService} from '../../../../../../core/store/store.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-publisher',
  templateUrl: './publisher.component.html',
  styleUrls: ['./publisher.component.scss']
})
export class PublisherComponent implements OnInit {
  @Input() post;
  @Output() remove = new EventEmitter<any>();
  @Output() edit = new EventEmitter<any>();
  constructor(public constant: ConstantService,
              public store: StoreService,
              private router: Router) { }

  ngOnInit(): void {
  }
  removePost(): void{
    this.remove.emit();
  }
  editPost(): void{
    this.edit.emit();
  }
  navigateToProfile(): void{
    if (this.store.role === this.constant.role.BUYER){
      this.router.navigateByUrl('/home/profile/viewProfile/' + this.post.createdBy._id).then();
    }
  }
}
