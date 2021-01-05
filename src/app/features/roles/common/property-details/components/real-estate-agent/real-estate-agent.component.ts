import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-real-estate-agent',
  templateUrl: './real-estate-agent.component.html',
  styleUrls: ['./real-estate-agent.component.scss']
})
export class RealEstateAgentComponent implements OnInit {
  @Input() realEstateAgent;
  constructor() { }

  ngOnInit(): void {
  }

}
