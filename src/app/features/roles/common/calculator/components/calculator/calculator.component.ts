import {Component, OnInit, ViewEncapsulation} from '@angular/core';

@Component({
  selector: 'app-calculator',
  templateUrl: './calculator.component.html',
  styleUrls: ['./calculator.component.scss'],
  encapsulation: ViewEncapsulation.Emulated
})
export class CalculatorComponent implements OnInit {
  selectedButton: string;
  buttons: string[];

  constructor() {}

  ngOnInit(): void {
    this.buttons = ['FHA', 'Conventional', 'USDA', 'VA'];
    this.selectedButton = this.buttons[0];

  }
  listClick(value): void{
    this.selectedButton = value;
  }
}
