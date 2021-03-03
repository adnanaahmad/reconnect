import {Component, ElementRef, OnInit, ViewChild, ViewEncapsulation} from '@angular/core';
import {FormBuilder, Validators} from '@angular/forms';
import {DeleteConfirmationPopupComponent} from '../../../../../../shared/components/delete-confirmation-popup/delete-confirmation-popup.component';
import {NgbModal, NgbModalConfig} from '@ng-bootstrap/ng-bootstrap';
import {ChatModel, UserModel} from 'src/app/features/roles/common/team-message-board/models/chat.model';
import {WebSocketService} from '../../../../../../core/webSockets/web-socket.service';
import {ChatService} from '../../services/chat.service';
import {CreateGroupChatComponent} from '../../popups/create-group-chat/create-group-chat.component';
import {StoreService} from '../../../../../../core/store/store.service';
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
  searchTerm = '';
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
    this.chat.messages = [];
    this.chat.user = this.store.getUserData();
    this.getRecentConversations();
    this.listenMessages();
    this.chat.inputForm = this.fb.group({
      inputText: ['', Validators.required],
    });
    this.chat.toggle = false;
  }
  listenMessages(): void{
    this.webSocket.listen('client-conversation-newMessage').subscribe(res => {
      console.log('socket messages', res);
      this.chat.messages.push(res);
      setTimeout(() => {
        this.chatBoxScroll.nativeElement.scrollTop = this.chatBoxScroll.nativeElement.scrollHeight;
      }, 0);
    });
  }
  sendMessage(): void {
    const data = {
      text: this.chat.inputForm.value.inputText,
      conversation: this.chat.selectedFriend._id,
      files: [],
      type: 'text',
    };
    this.webSocket.emit('server-conversation-newMessage', data);
    this.chat.inputForm.controls.inputText.setValue('');
    this.inputBox.nativeElement.focus();
  }

  addEmoji(event): void {
   // console.log(event.emoji.native);
    this.chat.inputForm.controls.inputText.setValue(this.chat.inputForm.controls.inputText.value + event.emoji.native);
    this.toggleEmojiMart();
    this.inputBox.nativeElement.focus();
  }
  toggleEmojiMart(): void {
    this.chat.toggle = !this.chat.toggle;
  }
  listClick(data): void {
   // console.log(data);
    this.chat.selectedFriend = data;
    this.chatService.getMessages(data._id).pipe(take(1)).subscribe(res => {
    //  console.log(res);
      this.chat.messages = res.result;
      setTimeout(() => {
        this.chatBoxScroll.nativeElement.scrollTop = this.chatBoxScroll.nativeElement.scrollHeight;
      }, 0);
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
      console.log(error);
    });
  }
  getRecentConversations(): void{
    this.chatService.getConversation().subscribe(res => {
      console.log('conversations', res);
      this.chat.loader = true;
      this.chat.recentChats = res.result;
      if (this.chat.recentChats.length > 0){
        this.listClick(this.chat.recentChats[0]);
      }
    }, error => {
      console.log(error);
    });
  }
  createGroupChat(): void{
    const modalRef = this.modalService.open(CreateGroupChatComponent);
    modalRef.result.then((result) => {
      if (result.status === 'yes') {
        this.chat.recentChats.unshift(result.data);
        this.listClick(this.chat.recentChats[0]);
      }
    }, error => {
      console.log(error);
    });
  }
  recentChatMember(array: Array<any>): UserModel{
    return array.find(data => data._id !== this.store.userId);
  }
  groupMembersProfileImage(id: string): string{
    const user = this.chat.selectedFriend.allTimeMembers.find(x => x._id === id);
    return user.profilePictureUrl ? user.profilePictureUrl : '/assets/profile/profile.svg';
  }
  showHideSendMessage(): boolean{
    if (!this.chat.selectedFriend) {
      return false;
    }
    if (this.chat.selectedFriend.type === this.constant.conversationType.PRIVATE){
      return this.chat.selectedFriend.allTimeMembers.length === this.chat.selectedFriend.members.length;
    } else {
      return  this.chat.selectedFriend.members.find(x => x._id === this.store.userId) ? true : false;
    }
  }
}
