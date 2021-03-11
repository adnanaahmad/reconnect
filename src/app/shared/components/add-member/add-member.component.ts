import {Component, Input, OnInit} from '@angular/core';
import {HelperService} from '../../../core/helper/helper.service';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {BuyerDashboardService} from '../../../features/roles/buyer/home-buying-dashboard/services/buyer-dashboard.service';
import {ConstantService} from '../../../core/constant/constant.service';
import {FormControl, Validators} from '@angular/forms';

@Component({
  selector: 'app-add-member',
  templateUrl: './add-member.component.html',
  styleUrls: ['./add-member.component.scss']
})
export class AddMemberComponent implements OnInit {
  @Input() role;
  public members: any;
  searchName: FormControl;
  constructor(private helper: HelperService,
              public modal: NgbActiveModal,
              private dashboard: BuyerDashboardService,
              private constant: ConstantService) { }

  ngOnInit(): void {
    this.helper.setModalPosition();
    this.searchName = new FormControl(null, Validators.required);
    console.log(this.role);
    this.getProfessionals();
    //     this.members = [
    //       {rating: 5,
    //         reviews: 1500,
    //         image: 'https://img-cdn.tid.al/o/4858a4b2723b7d0c7d05584ff57701f7b0c54ce3.jpg',
    //         name: 'Daniel Kevin', role: 'Real Estate Agent',
    //         number: '+923 24 4 1276',
    //         socialMedia: {
    //           facebook: 'https://www.google.com/',
    //           instagram: 'https://www.google.com/',
    //           linkedin: 'https://www.google.com/',
    //           twitter: 'https://www.google.com/',
    //           world: 'https://www.google.com/'
    //       }},
    // ];
    // }
  }
  addMember(member): void{
    console.log(member);
    this.dashboard.addTeamMember({userId: member._id}).subscribe(res => {
        this.modal.close({status: 'yes', data: res.result});
    }, error => {
      console.log(error);
    });
  }
  getProfessionals(): void{
    this.dashboard.getProfessionals(this.constant.chooseRole[this.role]).subscribe(res => {
      console.log(res);
      this.members = res.result;
    }, error => {
      console.log(error);
    });
  }
}
