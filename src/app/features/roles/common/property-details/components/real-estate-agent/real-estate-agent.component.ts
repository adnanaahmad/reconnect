import {Component, Input, OnInit} from '@angular/core';
import {RealEstateAgentModel} from '../../models/property-details.model';
import {AddMemberComponent} from '../../../../buyer/home-buying-dashboard/popups/add-member/add-member.component';
import {NgbModal, NgbModalConfig} from '@ng-bootstrap/ng-bootstrap';
import {ConstantService} from '../../../../../../core/constant/constant.service';

@Component({
  selector: 'app-real-estate-agent',
  templateUrl: './real-estate-agent.component.html',
  styleUrls: ['./real-estate-agent.component.scss']
})
export class RealEstateAgentComponent implements OnInit {
  @Input() realEstateAgent: RealEstateAgentModel = {} as RealEstateAgentModel;
  constructor(private modalService: NgbModal) { }

  ngOnInit(): void {
  }
  addTeamMember(): void{
    const modalRef = this.modalService.open(AddMemberComponent);
    modalRef.componentInstance.role = 'Real Estate Agent';
    modalRef.result.then((result) => {
      if (result.status === 'yes') {
        this.realEstateAgent = result.data.realEstateAgent.userId;
      }
    }, error => {
      console.log(error);
    });
  }
}
