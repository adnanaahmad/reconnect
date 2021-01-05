import {FormBuilder, FormGroup} from '@angular/forms';

export interface ChatModel {
user: any;
recentChats: Array<SelectedFriendModel>;
messages: any;
selectedFriend: SelectedFriendModel;
searchTerm: string;
toggle: boolean;
inputForm: FormGroup;
}

interface SelectedFriendModel {
  image: string;
  name: string;
  id: string;
  role: string;
}
