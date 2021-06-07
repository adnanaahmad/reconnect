import { Component, OnInit} from '@angular/core';
import {ProfessionalDirectoryModel} from '../../models/directory.model';
import {ConstantService} from '../../../../../../core/constant/constant.service';
import {take} from 'rxjs/operators';
import {ProfessionalDirectoryService} from '../../services/professional-directory.service';
import {HelperService} from '../../../../../../core/helper/helper.service';
import {StoreService} from '../../../../../../core/store/store.service';
import {Router} from '@angular/router';
import {FormControl} from '@angular/forms';
import {InviteUserComponent} from '../../../../../../shared/components/invite-user/invite-user.component';
import {NgbModal, NgbModalConfig} from '@ng-bootstrap/ng-bootstrap';
@Component({
  selector: 'app-professional-directory',
  templateUrl: './professional-directory.component.html',
  styleUrls: ['./professional-directory.component.scss']
})
export class ProfessionalDirectoryComponent implements OnInit {
  directory: ProfessionalDirectoryModel = {} as ProfessionalDirectoryModel;
  constructor(private constant: ConstantService,
              private professionalDirectory: ProfessionalDirectoryService,
              public helper: HelperService,
              public store: StoreService,
              private router: Router,
              private modalService: NgbModal,
              private configuration: NgbModalConfig) {
    configuration.centered = true;
    configuration.container = 'app-professional-directory';
  }

  ngOnInit(): void {
    this.directory.searchName = new FormControl(null);
    this.directory.buttons = Object.keys(this.constant.chooseRole);
    this.directory.selectedButton = this.directory.buttons[0];
    this.getProfessionals();
  }

  listClick(value): void {
    console.log(value);
    this.directory.selectedButton = value;
    this.getProfessionals();
  }
  getProfessionals(): void {
    this.store.updateProgressBarLoading(true);
    this.professionalDirectory.getProfessionals(this.constant.chooseRole[this.directory.selectedButton]).pipe(take(1)).subscribe(res => {
      this.directory.professionalDirectory = res.result;
      this.store.updateProgressBarLoading(false);
    }, error => {
      this.helper.handleApiError(error, 'Failed to retrieve professionals');
      this.store.updateProgressBarLoading(false);
    });
  }
  sendEmail(email: string): void{
    window.open(`mailto:${email}`);
  }
  viewProfile(id): void{
    this.router.navigateByUrl('/home/profile/viewProfile/' + id).then();
  }
  addNewProfessional(): void{
    const modalRef = this.modalService.open(InviteUserComponent);
    modalRef.componentInstance.role = 'professional';
    modalRef.result.then((result) => {
      if (result.status === 'yes') {
      }
    }, error => {
      console.log(error);
    });
  }
}
