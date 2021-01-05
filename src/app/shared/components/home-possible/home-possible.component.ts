import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-home-possible',
  templateUrl: './home-possible.component.html',
  styleUrls: ['./home-possible.component.scss']
})
export class HomePossibleComponent implements OnInit {
  @Input() finance;
  constructor() { }

  ngOnInit(): void {
  }

}
