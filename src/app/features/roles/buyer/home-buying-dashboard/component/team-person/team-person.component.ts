import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-team-person',
  templateUrl: './team-person.component.html',
  styleUrls: ['./team-person.component.scss']
})
export class TeamPersonComponent implements OnInit {
  @Input() details;
  constructor() { }

  ngOnInit(): void {
  }

}
