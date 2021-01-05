import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-fha',
  templateUrl: './fha.component.html',
  styleUrls: ['./fha.component.scss']
})
export class FhaComponent implements OnInit {
  @Input() finance;
  constructor() { }

  ngOnInit(): void {
  }

}
