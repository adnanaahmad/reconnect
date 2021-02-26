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
export interface CreateGroupChatModel{
  team: TeamDataModel;
  buyers: any;
  id: string;
  selectedButton: any;
  selectedTeam: Array<any>;
  groupForm: FormGroup;
}

interface TeamDataModel{
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
