import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-home-ready',
  templateUrl: './home-ready.component.html',
  styleUrls: ['./home-ready.component.scss']
})
export class HomeReadyComponent implements OnInit {
  @Input() finance;
  constructor() { }

  ngOnInit(): void {
  }

}
