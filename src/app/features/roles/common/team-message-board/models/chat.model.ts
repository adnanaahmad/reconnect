import {FormBuilder, FormControl, FormGroup} from '@angular/forms';

export interface ChatModel {
  user: UserModel;
  recentChats: Array<SelectedFriendModel>;
  messages: any;
  selectedFriend: SelectedFriendModel;
  searchTerm: string;
  toggle: boolean;
  inputForm: FormGroup;
  loader: boolean;
  messageLoader: boolean;
  homeInspectorExistsInTeam: boolean;
  insuranceAgentExistsInTeam: boolean;
  activateChatId: string;
}
interface SelectedFriendModel{
  allTimeMembers: Array<UserModel>;
  createdAt: string;
  createdBy: string;
  lastMessageBy: string;
  lastMessageContent: string;
  lastMessageTime: Date;
  members: Array<any>;
  team: string;
  type: string;
  title?: string;
  updatedAt: string;
  __v: number;
  _id: string;
  unread: Array<string>;
}
export interface UserModel {
  firstName: string;
  lastName: string;
  role: string;
  profilePictureUrl: string;
  phoneNumber: string;
  email: string;
  _id: string;
}
export interface CreateGroupChatModel{
  team: TeamDataModel;
  buyers: any;
  groups: any;
  id: string;
  selectedButton: any;
  selectedTeam: Array<any>;
  groupForm: FormGroup;
  postForm: FormGroup;
  shareType: FormControl;
  selectedBuyers: any;
  selectedGroups: any;
  loan: string;
  screenOne: boolean;
}

export interface TeamDataModel{
  buyer: TeamMemberModel;
  lender: TeamDataModel;
  homeInspector: TeamDataModel;
  insuranceAgent: TeamDataModel;
  attorney: TeamDataModel;
  realEstateAgent: TeamDataModel;
}

interface TeamMemberModel{
  email: string;
  firstName: string;
  lastName: string;
  phoneNumber: Array<string>;
  profilePictureUrl: string;
  referral: {details: any, type: string};
  socialMedia: {facebook: string, instagram: string, twitter: string};
  _id: string;
}

export interface QuoteModel{
  date: any;
  fee: string;
  image: string;
  time: string;
  description: string;
  price: string;
  status: string;
}
