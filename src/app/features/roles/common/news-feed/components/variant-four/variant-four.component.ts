import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {ConstantService} from '../../../../../../core/constant/constant.service';

@Component({
  selector: 'app-variant-four',
  templateUrl: './variant-four.component.html',
  styleUrls: ['./variant-four.component.scss']
})
export class VariantFourComponent implements OnInit {
  @Input() post;
  @Output() remove = new EventEmitter<any>();
  @Output() edit = new EventEmitter<any>();
  constructor(public constant: ConstantService) { }

  ngOnInit(): void {
  }
  removePost(): void{
    this.remove.emit();
  }
  editPost(): void{
    this.edit.emit();
  }
}
