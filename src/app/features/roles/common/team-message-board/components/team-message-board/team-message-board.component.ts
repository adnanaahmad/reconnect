import {Component, ElementRef, OnInit, ViewChild, ViewEncapsulation} from '@angular/core';
import {FormBuilder, Validators} from '@angular/forms';
import {DeleteConfirmationPopupComponent} from '../../../../../../shared/components/delete-confirmation-popup/delete-confirmation-popup.component';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {ChatModel} from 'src/app/features/roles/common/team-message-board/models/chat.model';
@Component({
  selector: 'app-team-message-board',
  templateUrl: './team-message-board.component.html',
  styleUrls: ['./team-message-board.component.scss'],
  encapsulation: ViewEncapsulation.Emulated
})
export class TeamMessageBoardComponent implements OnInit {
  chat: ChatModel = {} as ChatModel;
  //selectedFriend;
  searchTerm: string = 'on';
  //recentChats: any;
  @ViewChild('textArea') inputBox: ElementRef;
  @ViewChild('chatBox') chatBoxScroll: ElementRef;
  //messages: any[] = [];
  //toggle: boolean = false;
  // inputForm = this.fb.group({
  //   inputText: ['', Validators.required],
  // });

  constructor(private fb: FormBuilder, private modalService: NgbModal ) {
  }

  ngOnInit(): void {
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

    this.chat.recentChats = [
      {image: 'https://img-cdn.tid.al/o/4858a4b2723b7d0c7d05584ff57701f7b0c54ce3.jpg', name: 'Rafael Nadal', id: '1', role: 'Real Estate Agent'},
      {image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRHPzYd8Zq8A3IXMaeSeTyfaSTce2CLi0NZ-Q&usqp=CAU', name: 'Kevin Herman', id: '2', role: 'Lender'},
      {image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQFfao9ML9S9TYzrCqtva7w0FW1Y2RL2CriuQ&usqp=CAU', name: 'Daniel Ho', id: '3', role: 'Home Inspector'},
      {image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS6zes53m4a_2VLTcmTn_bHk8NO5SkuWfcQbg&usqp=CAU', name: 'Remi Abd', id: '4', role: 'Seller'},
      {image: 'https://alicepropertymanagement.com/images/temp-profile.jpg', name: 'Ch Marc Rauf', id: '5', role: 'Attorney'},
      {image: 'https://alicepropertymanagement.com/images/temp-profile.jpg', name: 'Ch Marc Rauf', id: '5', role: 'Attorney'}
    ];
    this.chat.selectedFriend = this.chat.recentChats[0];


    this.chat.messages = [
      {text: 'Hello', userId: 2, file: [{media: 'https://media.istockphoto.com/photos/beautiful-luxury-home-exterior-at-twilight-picture-id1026205392?k=6&m=1026205392&s=612x612&w=0&h=pe0Pqbm7GKHl7cmEjf9Drc7Fp-JwJ6aTywsGfm5eQm4=', type: 'image'},{media: 'https://media.istockphoto.com/photos/beautiful-luxury-home-exterior-at-twilight-picture-id1026205392?k=6&m=1026205392&s=612x612&w=0&h=pe0Pqbm7GKHl7cmEjf9Drc7Fp-JwJ6aTywsGfm5eQm4=', type: 'image'}, {media: 'https://www.learningcontainer.com/wp-content/uploads/2020/05/sample-mp4-file.mp4', type: 'video'}]},
      {text: 'Hi', userId: 1 },
      {text: 'working to revolutionize transportation both on Earth,  \n through electric car maker  - and in space, via rocket producer Space', userId: 2, file: [] },
      {text: 'stepped down as chairman in 2018, after making alleged "false statements" about a plan', userId: 2, file: [] },
      {text: 'Powerwall users have mistakenly configured their \n devices to be exposed on the Web', userId: 2, file: [] },
      {text: 'users have mistakenly configured their devices to be exposed on the Web', userId: 2 },
      {text: 'mistakenly configured their devices to be exposed on the Web', userId: 1, file: [] },
      {text: 'revolutionize transportation both on Earth', userId: 2, file: [] }
    ];
    setTimeout(() => {
      this.chatBoxScroll.nativeElement.scrollTop = this.chatBoxScroll.nativeElement.scrollHeight;
    }, 1);
  }
  sendMessage(): void {
    //console.log(this.inputForm.value)
    this.chat.messages.push({
      text: this.chat.inputForm.value.inputText,
      userId: 1
    });

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
  listClick(newValue): void {
    this.chat.selectedFriend = newValue;
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
