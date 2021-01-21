import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-view-partners-profile',
  templateUrl: './view-partners-profile.component.html',
  styleUrls: ['./view-partners-profile.component.scss']
})
export class ViewPartnersProfileComponent implements OnInit {
  @Input() userProfile;
  constructor() { }

  ngOnInit(): void {
  }

}
