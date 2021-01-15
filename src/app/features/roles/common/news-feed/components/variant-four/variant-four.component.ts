import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-variant-four',
  templateUrl: './variant-four.component.html',
  styleUrls: ['./variant-four.component.scss']
})
export class VariantFourComponent implements OnInit {
  @Input() post;
  constructor() { }

  ngOnInit(): void {
  }

}
