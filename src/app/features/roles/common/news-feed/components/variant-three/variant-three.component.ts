import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-variant-three',
  templateUrl: './variant-three.component.html',
  styleUrls: ['./variant-three.component.scss']
})
export class VariantThreeComponent implements OnInit {
  @Input() post;
  constructor() { }

  ngOnInit(): void {
  }

}
