import {AfterViewInit, Component, ElementRef, Input, OnInit, QueryList, ViewChildren} from '@angular/core';

@Component({
  selector: 'app-variant-one',
  templateUrl: './variant-one.component.html',
  styleUrls: ['./variant-one.component.scss']
})
export class VariantOneComponent implements OnInit, AfterViewInit {
  @ViewChildren('postContent') postContent: QueryList<ElementRef>;
  @Input() post;
  constructor() { }

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
  previousMedia(mediaArray, event): void{
    const imageElement = (event.target as HTMLImageElement).closest('div.media-col').children[0] as HTMLImageElement;
    const index = mediaArray.findIndex(x => x.media === imageElement.src);
    if (index > 0) {
      imageElement.src = mediaArray[index - 1].media;
    }
  }
  nextMedia(mediaArray, event): void{
    const imageElement = (event.target as HTMLImageElement).closest('div.media-col').children[0] as HTMLImageElement;
    const index = mediaArray.findIndex(x => x.media === imageElement.src);    if (index >= 0 && index < mediaArray.length - 1) {
      imageElement.src = mediaArray[index + 1].media;
    }
  }
}
