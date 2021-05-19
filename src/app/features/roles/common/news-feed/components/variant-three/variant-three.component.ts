import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {ConstantService} from '../../../../../../core/constant/constant.service';

@Component({
  selector: 'app-variant-three',
  templateUrl: './variant-three.component.html',
  styleUrls: ['./variant-three.component.scss']
})
export class VariantThreeComponent implements OnInit {
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
