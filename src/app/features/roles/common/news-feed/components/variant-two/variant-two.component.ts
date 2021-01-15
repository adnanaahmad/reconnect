import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-variant-two',
  templateUrl: './variant-two.component.html',
  styleUrls: ['./variant-two.component.scss']
})
export class VariantTwoComponent implements OnInit {
  @Input() post;
  constructor() { }

  ngOnInit(): void {
  }

  previousMedia(mediaArray, event): void{
    const imageElement = (event.target as HTMLImageElement).closest('div.media-col').children[2] as HTMLImageElement;
    const index = mediaArray.findIndex(x => x.media === imageElement.src);
    if (index > 0) {
      imageElement.src = mediaArray[index - 1].media;
    }
  }
  nextMedia(mediaArray, event): void{
    const imageElement = (event.target as HTMLImageElement).closest('div.media-col').children[2] as HTMLImageElement;
    const index = mediaArray.findIndex(x => x.media === imageElement.src);    if (index >= 0 && index < mediaArray.length - 1) {
      imageElement.src = mediaArray[index + 1].media;
    }
  }

}
