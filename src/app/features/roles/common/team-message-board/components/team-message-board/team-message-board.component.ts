import {Component, ElementRef, OnDestroy, OnInit, ViewChild, ViewEncapsulation} from '@angular/core';
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
import {forkJoin, Subscription} from 'rxjs';
import {ToastrService} from 'ngx-toastr';
import {ActivatedRoute} from '@angular/router';
@Component({
  selector: 'app-team-message-board',
  templateUrl: './team-message-board.component.html',
  styleUrls: ['./team-message-board.component.scss'],
  encapsulation: ViewEncapsulation.Emulated
})
export class TeamMessageBoardComponent implements OnInit, OnDestroy {
  chat: ChatModel = {} as ChatModel;
  subscription: Subscription;
  searchTerm = '';
  @ViewChild('textArea') inputBox: ElementRef;
  @ViewChild('chatBox') chatBoxScroll: ElementRef;
  @ViewChild('conversationList') conversationListScroll: ElementRef;


  constructor(private fb: FormBuilder,
              private modalService: NgbModal,
              private webSocket: WebSocketService,
              private chatService: ChatService,
              private configuration: NgbModalConfig,
              public store: StoreService,
              public constant: ConstantService,
              public helper: HelperService,
              private toaster: ToastrService,
              private activatedRoute: ActivatedRoute) {
    configuration.centered = true;
    configuration.container = 'app-team-message-board';
  }

  ngOnInit(): void {
    this.chat.loader = false;
    this.chat.messages = [];
    this.chat.user = this.store.getUserData();
    this.getRecentConversations();
    this.listenMessages();
    this.getTeam();
    this.chat.inputForm = this.fb.group({
      inputText: ['', [Validators.required, Validators.pattern('^$|.*\\S+.*')]],
    });
    this.chat.toggle = false;
    this.activatedRoute.queryParams.pipe(take(1)).subscribe(params => {
      if (Object.keys(params).length !== 0) {
        this.chat.activateChatId = params.professional;
      }
    });
  }
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  listenMessages(): void{
    this.subscription = this.webSocket.listen('client-conversation-newMessage').subscribe(res => {
      console.log('socket messages', res);
      // opened chat
      if (this.chat.selectedFriend._id === res.conversation) {
        this.chat.messages.push(res);
      }
      this.updateRecentChat(res);
      setTimeout(() => {
        this.chatBoxScroll.nativeElement.scrollTop = this.chatBoxScroll.nativeElement.scrollHeight;
      }, 0);
    });
  }
  updateRecentChat(res): void {
    const index = this.chat.recentChats.findIndex(x => x._id === res.conversation);
    const recentChat = this.chat.recentChats[index];
    // new message tag, if not opened chat
    if (recentChat._id !== this.chat.selectedFriend._id){
      recentChat.unread.push(this.chat.user._id);
    }
    if ( index > 0){
      this.chat.recentChats.splice(index, 1);
      this.chat.recentChats.unshift(recentChat);
      this.conversationListScroll.nativeElement.scrollTop = 0;
    }
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
    this.chat.messageLoader = false;
    this.chat.selectedFriend = data;
    // new msg read
    this.removeUnread();
    forkJoin([this.chatService.getMessages(data._id), this.chatService.markAsReadConversation({conversationId: data._id})])
        .pipe(take(1)).subscribe(res => {
      console.log(res);
      this.chat.messageLoader = true;
      this.chat.messages = res[0].result;
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
    this.store.updateProgressBarLoading(true);
    this.chatService.getConversation().pipe(take(1)).subscribe(res => {
      console.log('conversations', res);
      this.chat.loader = true;
      this.chat.recentChats = res.result;
      if (this.chat.activateChatId){
        const index = this.getActivatedChatIndex;
        this.listClick(this.chat.recentChats[index]);
      } else if (this.chat.recentChats.length > 0){
        this.listClick(this.chat.recentChats[0]);
      }
      this.store.updateProgressBarLoading(false);
    }, error => {
      console.log(error);
      this.store.updateProgressBarLoading(false);
    });
  }
  createGroupChat(): void{
    const modalRef = this.modalService.open(CreateGroupChatComponent);
    modalRef.componentInstance.type = 'create';
    modalRef.componentInstance.groupMembers = null;
    modalRef.result.then((result) => {
      if (result.status === 'yes') {
        this.chat.recentChats.unshift(result.data);
        this.listClick(this.chat.recentChats[0]);
        this.conversationListScroll.nativeElement.scrollTop = 0;
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
  editGroup(): void{
    const modalRef = this.modalService.open(CreateGroupChatComponent);
    modalRef.componentInstance.type = 'edit';
    modalRef.componentInstance.groupMembers = this.chat.selectedFriend.members;
    modalRef.componentInstance.groupTitle = this.chat.selectedFriend.title;
    modalRef.componentInstance.conversationId = this.chat.selectedFriend._id;
    modalRef.componentInstance.teamId = this.chat.selectedFriend.team;
    modalRef.result.then((result) => {
      if (result.status === 'yes') {
        const index = this.chat.recentChats.findIndex(x => x._id === this.chat.selectedFriend._id);
        console.log(result.data);
        this.chat.recentChats[index] = result.data;
        this.listClick(result.data);
      }
    }, error => {
      console.log(error);
    });
  }
  getTeam(): void{
    this.chatService.getTeam().pipe(take(1)).subscribe(res => {
      // console.log(res);
      this.chat.homeInspectorExistsInTeam = res.result.homeInspector ? true : false;
      this.chat.insuranceAgentExistsInTeam = res.result.insuranceAgent ? true : false;
      // console.log(this.chat.homeInspectorExistsInTeam);
    }, error => {
      console.log(error);
    });
  }
  addProfessionalToTeam(id: string, role: string): void{
    this.chatService.addTeamMember({userId: id}).pipe(take(1)).subscribe(res => {
      role === this.constant.role.INSURANCE ? this.chat.insuranceAgentExistsInTeam = true : this.chat.homeInspectorExistsInTeam = true;
      this.toaster.success('Professional has been added to team');
    }, error => {
      this.toaster.error('Failed to add professional to team');
    });
  }
  professionalExistsInTeam(role): boolean{
    return role === this.constant.role.INSURANCE ? !this.chat.insuranceAgentExistsInTeam : !this.chat.homeInspectorExistsInTeam;
  }
  get getActivatedChatIndex(): number{
    return this.chat.recentChats.findIndex(x => {
      if (x.type === this.constant.conversationType.PRIVATE){
        const id = x.allTimeMembers.findIndex( y => y._id === this.chat.activateChatId);
        return id !== -1;
      }
    });
  }
  unreadMessage(friend): boolean{
    return friend.unread.findIndex(x => x === this.chat.user._id) !== -1;
  }
  removeUnread(): void{
    const index = this.chat.selectedFriend.unread.findIndex( x => x === this.chat.user._id);
    if (index !== -1) {
      this.chat.selectedFriend.unread.splice(index, 1);
    }
  }
}
