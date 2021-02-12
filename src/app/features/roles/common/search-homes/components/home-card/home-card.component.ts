import {Component, Input, OnInit, Output, EventEmitter, ViewChild, ElementRef, AfterViewInit} from '@angular/core';
import {HomeModel} from '../../../../buyer/favorites/models/favorites.model';
import {Router} from '@angular/router';

@Component({
  selector: 'app-home-card',
  templateUrl: './home-card.component.html',
  styleUrls: ['./home-card.component.scss']
})
export class HomeCardComponent implements OnInit, AfterViewInit {
  @Input() home: HomeModel = {} as HomeModel;
  @Output() toggleEvent = new EventEmitter<any>();
  @ViewChild('homeCard') homeCard: ElementRef;
  constructor(public router: Router) { }

  ngOnInit(): void {
  }
  favoriteHome(): void{
    this.home.favorite = !this.home.favorite;
  }
  ngAfterViewInit(): void {
    const paragraph = this.homeCard.nativeElement.childNodes[0];
    const readMore = this.homeCard.nativeElement.childNodes[1];
    const height = (paragraph).offsetHeight;
    const lineHeight = getComputedStyle(paragraph).lineHeight;
    const lines = height / parseInt(lineHeight);
    if ( lines <= 5){
      (readMore).style.display = 'none';
    } else{
      (paragraph).style['-webkit-line-clamp'] = 5;
    }
  }
  toggle(): void{
    const element = this.homeCard.nativeElement;
    if (!element.children[0].style['-webkit-line-clamp'] || element.children[0].style['-webkit-line-clamp'] === '5'){
      element.children[0].style['-webkit-line-clamp'] = 10000;
      element.children[1].style.display = 'none';
      element.children[2].style.display = 'block';
    } else{
      element.children[0].style['-webkit-line-clamp'] = 5;
      element.children[1].style.display = 'block';
      element.children[2].style.display = 'none';
    }
  }
}
