import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-landing-page-card',
  templateUrl: './landing-page-card.component.html',
  styleUrls: ['./landing-page-card.component.scss']
})
export class LandingPageCardComponent implements OnInit {
  @Input() data;
  constructor() { }

  ngOnInit(): void {
  }

}
