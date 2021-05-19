import {AfterViewInit, Component, ElementRef, EventEmitter, Input, OnInit, Output, QueryList, ViewChildren} from '@angular/core';
import {ConstantService} from '../../../../../../core/constant/constant.service';

@Component({
  selector: 'app-variant-one',
  templateUrl: './variant-one.component.html',
  styleUrls: ['./variant-one.component.scss']
})
export class VariantOneComponent implements OnInit, AfterViewInit {
  @ViewChildren('postContent') postContent: QueryList<ElementRef>;
  @Input() post;
  @Output() remove = new EventEmitter<any>();
  @Output() edit = new EventEmitter<any>();
  constructor(public constant: ConstantService) { }

  ngOnInit(): void {
  }
  ngAfterViewInit(): void {
    this.postContent.forEach((element) => {
      const paragraph = element.nativeElement.children[0];
      const readMore = element.nativeElement.children[1];
      const height = (paragraph).offsetHeight;
      const lineHeight = getComputedStyle(paragraph).lineHeight;
      const lines = height / parseInt(lineHeight);
      if ( lines <= 9){
        (readMore).style.display = 'none';
      } else{
        (paragraph).style['-webkit-line-clamp'] = 9;
      }
    });
  }
  toggle(event): void{
    const element = event.target.closest('div.post-parent');
    if (!element.children[0].style['-webkit-line-clamp'] || element.children[0].style['-webkit-line-clamp'] === '9'){
      element.children[0].style['-webkit-line-clamp'] = 10000;
      element.children[1].style.display = 'none';
      element.children[2].style.display = 'block';
    } else{
      element.children[0].style['-webkit-line-clamp'] = 9;
      element.children[1].style.display = 'block';
      element.children[2].style.display = 'none';
    }
  }
  previous(array): void{
    this.leftShift(array);
  }
  next(array): void{
    this.rightShift(array);
  }

  leftShift(arr): Array<any>{
    const last = arr.pop();
    arr.unshift(last);
    return arr;
  }
  rightShift(arr): Array<any>{
    const first = arr[0];
    arr.shift();
    arr.push(first);
    return arr;
  }
  removePost(): void{
    this.remove.emit();
  }
  editPost(): void{
    this.edit.emit();
  }
}
