import {AfterViewInit, Component, ElementRef, Input, OnInit, ViewChild} from '@angular/core';
import {QuoteModel} from '../../models/chat.model';
import {StoreService} from '../../../../../../core/store/store.service';
import {ConstantService} from '../../../../../../core/constant/constant.service';
import {ChatService} from '../../services/chat.service';
import {take} from 'rxjs/operators';
import {HelperService} from '../../../../../../core/helper/helper.service';
import {ToastrService} from 'ngx-toastr';

@Component({
  selector: 'app-quote-request-message',
  templateUrl: './quote-request-message.component.html',
  styleUrls: ['./quote-request-message.component.scss']
})
export class QuoteRequestMessageComponent implements OnInit, AfterViewInit {
  @Input() messageId: string;
  @Input() data: QuoteModel;
  @Input() showActionButton: boolean;
  @ViewChild('description') description: ElementRef;
  constructor(public store: StoreService,
              public constant: ConstantService,
              private chatService: ChatService,
              private helper: HelperService,
              private toaster: ToastrService) {}

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    const readMore = this.description.nativeElement.childNodes[1];
    const paragraph = this.description.nativeElement.childNodes[0];
    const height = (paragraph).offsetHeight;
    const lineHeight = getComputedStyle(paragraph).lineHeight;
    const lines = height / parseInt(lineHeight);
    if ( lines <= 2){
      (readMore).style.display = 'none';
    } else{
      (paragraph).style['-webkit-line-clamp'] = 2;
    }
  }

  toggle(): void{
    const element = this.description.nativeElement;
    if (!element.children[0].style['-webkit-line-clamp'] || element.children[0].style['-webkit-line-clamp'] === '2'){
      element.children[0].style['-webkit-line-clamp'] = 10000;
      element.children[1].style.display = 'none';
      element.children[2].style.display = 'block';
    } else{
      element.children[0].style['-webkit-line-clamp'] = 2;
      element.children[1].style.display = 'block';
      element.children[2].style.display = 'none';
    }
  }
  quoteResponse(status): void{
    if (this.showActionButton) {
      this.chatService.quoteResponse({messageId: this.messageId, quoteStatus: status}).pipe(take(1)).subscribe(res => {
        this.data.status = status;
      }, error => {
        this.helper.handleApiError(error, 'Failed to perform action');
      });
    } else {
      this.toaster.error('You already have this professional in your team');
    }
  }
}
