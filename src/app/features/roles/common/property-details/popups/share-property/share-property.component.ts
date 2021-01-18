import { Component, OnInit } from '@angular/core';
import {HelperService} from '../../../../../../core/helper/helper.service';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {FormControl, Validators} from '@angular/forms';

@Component({
  selector: 'app-share-property',
  templateUrl: './share-property.component.html',
  styleUrls: ['./share-property.component.scss']
})
export class SharePropertyComponent implements OnInit {
  teamData: any;
  selectedTeam: any[] = [];
  message: any;
  constructor(private helper: HelperService, private modal: NgbActiveModal) { }

  ngOnInit(): void {
    this.helper.setModalPosition();
    this.message = new FormControl('', Validators.required);
    this.teamData = [
      {
        name: 'Rafael Nadal',
        role: 'Real Estate Agent',
        image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRkqkWLzMbf_6cUuaxj9rAaJ61f3ntPBoto9g&usqp=CAU',
        phone: '+942 23 1 6783',
        email: 'abc@gmail.com'
      },
      {
        name: 'Parineeti Akash',
        role: 'Lender',
        image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT3UQl0sqcrJGd-tT4QCmfmPFv6AQKmQpSJHA&usqp=CAU',
        phone: '+942 23 1 6783',
        email: 'abc@gmail.com'
      },
      {
        name: 'Paul Jensen',
        role: 'Attorney',
        image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSr2RcD2fiReC2iLFK2CFL0MXCJrWaD7pPf5Q&usqp=CAU',
        phone: '+942 23 1 6783',
        email: 'abc@gmail.com'
      },
      {
        name: 'Ali Mustaqeem',
        role: 'Home Inspector',
        image: 'https://www.rashidahdevore.com/uploads/9/0/0/6/90067921/ssp-64544-fs-web.jpg',
        phone: '+942 23 1 6783',
        email: 'abc@gmail.com'
      },
      {
        name: 'Rahim Ali',
        role: 'Insurance Agent',
        image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRcQeTDPANCGDQkVik0SBPix19KW-EFxphfag&usqp=CAU',
        phone: '+942 23 1 6783',
        email: 'abc@gmail.com'
      }
    ];
  }
  close(): void{
    this.modal.dismiss();
  }
  toggleTeamMember(i, member): void{
      this.helper.toggleTeamMember(i, member, this.selectedTeam);
  }
  share(): void{
    this.modal.close({status: 'yes', data: {team: this.selectedTeam, message: this.message.value}});
  }
}
