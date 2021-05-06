import {Component, Input, OnInit} from '@angular/core';
import {Router} from '@angular/router';

@Component({
  selector: 'app-landing-side-nav',
  templateUrl: './landing-side-nav.component.html',
  styleUrls: ['./landing-side-nav.component.scss']
})
export class LandingSideNavComponent implements OnInit {
  @Input() routes: any;
  button: any;
  constructor(private router: Router) { }

  ngOnInit(): void {
    this.button = this.router.url;
  }
  activeButton(data): void{
    this.button = data.path;
  }
}
