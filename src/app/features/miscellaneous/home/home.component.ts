import { Component, OnInit } from '@angular/core';
import {AuthService} from '../../landing/services/auth/auth.service';
import {take} from 'rxjs/operators';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  homes: Array<any>;
  popularPlaces: Array<any>;
  constructor(private auth: AuthService) { }

  ngOnInit(): void {
    this.popularPlaces = [
      {url: '/assets/landing/boston.png', name: 'Boston, MA'},
      {url: '/assets/landing/capeCod.png', name: 'Cape Cod, MA'},
      {url: '/assets/landing/cambridge.png', name: 'Cambridge, MA'},
      {url: '/assets/landing/salem.png', name: 'Salem, MA'},
      {url: '/assets/landing/worcester.png', name: 'Worcester, MA'},
      {url: '/assets/landing/springfield.png', name: 'Springfield, MA'},
    ];
    this.getFeaturedHomes();
  }
  getFeaturedHomes(): void{
    this.auth.getFeaturedHomes().pipe(take(1)).subscribe(res => {
      console.log(res);
      this.homes = res.result.listings;
    }, error => {
      console.log(error);
    });
  }
  previous(array): void{
    this.leftShift(array);
  }
  next(array): void{
    this.rightShift(array);
  }

  leftShift(arr): Array<any>{
    for (let i = 0; i < 4; i++) {
      const last = arr.pop();
      arr.unshift(last);
    }
    return arr;
  }
  rightShift(arr): Array<any>{
    for (let i = 0; i < 4; i++) {
      const first = arr[0];
      arr.shift();
      arr.push(first);
    }
    return arr;
  }

}
