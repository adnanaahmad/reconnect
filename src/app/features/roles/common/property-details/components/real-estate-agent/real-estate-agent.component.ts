import {Component, Input, OnInit} from '@angular/core';
import {RealEstateAgentModel} from '../../models/property-details.model';
import {AddMemberComponent} from '../../../../buyer/home-buying-dashboard/popups/add-member/add-member.component';
import {NgbModal, NgbModalConfig} from '@ng-bootstrap/ng-bootstrap';
import {ConstantService} from '../../../../../../core/constant/constant.service';
import {PropertyDetailsService} from '../../services/property-details.service';
import {ToastrService} from 'ngx-toastr';
import {take} from 'rxjs/operators';
import {environment} from '../../../../../../../environments/environment';

@Component({
  selector: 'app-real-estate-agent',
  templateUrl: './real-estate-agent.component.html',
  styleUrls: ['./real-estate-agent.component.scss']
})
export class RealEstateAgentComponent implements OnInit {
  @Input() realEstateAgent: RealEstateAgentModel = {} as RealEstateAgentModel;
  @Input() mlsId: string;
  constructor(private modalService: NgbModal,
              private propertyDetails: PropertyDetailsService,
              private toaster: ToastrService,
              private constant: ConstantService) { }

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
  bookNow(): void{
    const data = {
      to: this.realEstateAgent._id,
      text: `${environment.clientUrl}/home/propertyDetails/${this.mlsId}`,
      files: [],
      type: this.constant.chatMessageType.MESSAGE_TYPE_BOOK_PROPERTY,
      shareMeta: {}
    };
    this.propertyDetails.shareOrBookProperty(data).pipe(take(1)).subscribe(res => {
      this.toaster.success('Property has been shared');
      }, error => {
        this.toaster.error('Failed to share property');
      });
  }
}
