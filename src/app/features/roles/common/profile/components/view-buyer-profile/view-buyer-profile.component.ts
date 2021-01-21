import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-view-buyer-profile',
  templateUrl: './view-buyer-profile.component.html',
  styleUrls: ['./view-buyer-profile.component.scss']
})
export class ViewBuyerProfileComponent implements OnInit {
  @Input() userProfile;
  constructor() { }

  ngOnInit(): void {
  }

}
