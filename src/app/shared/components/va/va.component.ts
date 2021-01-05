import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-va',
  templateUrl: './va.component.html',
  styleUrls: ['./va.component.scss']
})
export class VaComponent implements OnInit {
  @Input() finance;
  constructor() { }

  ngOnInit(): void {
  }

}
