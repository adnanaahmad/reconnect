import { Injectable } from '@angular/core';
import { ConstantService } from 'src/app/core/constant/constant.service';

@Injectable()
export class NavigationService {

  constructor(private constant: ConstantService) { }

  getBuyerMenuItems(): Array<any> {
    return this.constant.buyer;
  }
  getLenderMenuItems(): Array<any> {
    return this.constant.lender;
  }
  getRealEstateAgentMenuItems(): Array<any> {
    return this.constant.realEstateAgent;
  }
  getAttorneyMenuItems(): Array<any> {
    return this.constant.attorney;
  }
  getHomeInspectorMenuItems(): Array<any> {
    return this.constant.homeInspector;
  }
}
