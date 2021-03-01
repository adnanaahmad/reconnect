import {Component, ElementRef, OnInit, ViewChild, ViewEncapsulation} from '@angular/core';
import {FormBuilder, Validators} from '@angular/forms';
import {DeleteConfirmationPopupComponent} from '../../../../../../shared/components/delete-confirmation-popup/delete-confirmation-popup.component';
import {NgbModal, NgbModalConfig} from '@ng-bootstrap/ng-bootstrap';
import {ChatModel} from 'src/app/features/roles/common/team-message-board/models/chat.model';
import {WebSocketService} from '../../../../../../core/webSockets/web-socket.service';
import {ChatService} from '../../services/chat.service';
import {CreateGroupChatComponent} from '../../popups/create-group-chat/create-group-chat.component';
import {StoreService} from '../../../../../../core/store/store.service';
import {element} from 'protractor';
import {ConstantService} from '../../../../../../core/constant/constant.service';
import {HelperService} from '../../../../../../core/helper/helper.service';
import {take} from 'rxjs/operators';
@Component({
  selector: 'app-team-message-board',
  templateUrl: './team-message-board.component.html',
  styleUrls: ['./team-message-board.component.scss'],
  encapsulation: ViewEncapsulation.Emulated
})
export class TeamMessageBoardComponent implements OnInit {
  chat: ChatModel = {} as ChatModel;
  searchTerm: string = '';
  @ViewChild('textArea') inputBox: ElementRef;
  @ViewChild('chatBox') chatBoxScroll: ElementRef;


  constructor(private fb: FormBuilder,
              private modalService: NgbModal,
              private webSocket: WebSocketService,
              private chatService: ChatService,
              private configuration: NgbModalConfig,
              public store: StoreService,
              public constant: ConstantService,
              public helper: HelperService) {
    configuration.centered = true;
    configuration.container = 'app-team-message-board';
  }

  ngOnInit(): void {
    this.chat.loader = false;
    this.getRecentConversations();
    this.listenMessages();
    this.chat.inputForm = this.fb.group({
      inputText: ['', Validators.required],
    });
    this.chat.toggle = false;
    this.chat.user = {
      name: 'James Kanist',
      role: 'Real Estate Agent',
      status: 'Online',
      image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT_2NLMlYCATt8ioaZsg-nuEGSsWVDBoAPIZw&usqp=CAU',
    };
    setTimeout(() => {
      this.chatBoxScroll.nativeElement.scrollTop = this.chatBoxScroll.nativeElement.scrollHeight;
    }, 1);
  }
  listenMessages(): void{
    this.webSocket.listen('client-conversation-newMessage').subscribe(res => {
      this.chat.messages.push(res);
    });
  }
  sendMessage(): void {
    const data = {
      text: this.chat.inputForm.value.inputText,
      conversation: this.chat.selectedFriend['_id'],
      files: [],
      type: 'text',
    };
    this.webSocket.emit('server-conversation-newMessage', data);
    this.chat.inputForm.controls.inputText.setValue('');
    this.inputBox.nativeElement.focus();

    setTimeout(() => {
          this.chatBoxScroll.nativeElement.scrollTop = this.chatBoxScroll.nativeElement.scrollHeight;
    }, 1);
  }

  addEmoji(event): void {
    console.log(event.emoji.native);
    this.chat.inputForm.controls.inputText.setValue(this.chat.inputForm.controls.inputText.value + event.emoji.native);
    this.toggleEmojiMart();
    this.inputBox.nativeElement.focus();
  }
  toggleEmojiMart(): void {
    this.chat.toggle = !this.chat.toggle;
  }
  listClick(data): void {
    this.chat.selectedFriend = data;
    this.chatService.getMessages(data._id).pipe(take(1)).subscribe(res => {
      console.log(res);
     this.chat.messages = res.result;
    }, error => {
      console.log(error);
    });
  }
  deleteChat(): void {
    const modalRef = this.modalService.open(DeleteConfirmationPopupComponent);
    modalRef.result.then((result) => {
      if (result === 'Yes') {
        console.log(result);
        this.chat.messages = [];
      }
    }, error => {
      //console.log(error);
    });
  }
  getRecentConversations(): void{
    this.chatService.getConversation().subscribe(res => {
      console.log(res);
      this.chat.loader = true;
      this.chat.recentChats = res.result;
    }, error => {
      console.log(error);
    });
  }
  createGroupChat(): void{
    const modalRef = this.modalService.open(CreateGroupChatComponent);
    modalRef.result.then((result) => {
      if (result === 'Yes') {
        console.log(result);
        //this.chat.messages = [];
      }
    }, error => {
      //console.log(error);
    });
  }
  recentChatMember(array: Array<any>): {}{
    return array.find(data => data._id !== this.store.userId);
  }
  //sendMessage(event) {
    //   const files = !event.files ? [] : event.files.map((file) => {
    //     return {
    //       url: file.src,
    //       type: file.type,
    //       icon: 'file-text-outline',
    //     };
    //   });
    //
    //   this.messages.push({
    //     text: event.message,
    //     date: new Date(),
    //     files: files,
    //     type: files.length ? 'file' : 'text',
    //     reply: true,
    //     user: {
    //       name: 'Jonh Doe',
    //       avatar: 'https://i.gifer.com/no.gif',
    //     },
    //   });
    // }
}
