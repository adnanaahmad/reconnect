import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-usda',
  templateUrl: './usda.component.html',
  styleUrls: ['./usda.component.scss']
})
export class UsdaComponent implements OnInit {
  @Input() finance;
  constructor() { }

  ngOnInit(): void {
  }

}
