import {Component, EventEmitter, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-change-letter-button',
  templateUrl: './change-letter-button.component.html',
  styleUrls: ['./change-letter-button.component.scss']
})
export class ChangeLetterButtonComponent implements OnInit {
  @Output() openPopup = new EventEmitter<any>();
  constructor() { }

  ngOnInit(): void {
  }

}
