import {AfterViewInit, Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {Router} from '@angular/router';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.scss']
})
export class LandingComponent implements OnInit, AfterViewInit {
  @ViewChild('card') cardComponent: ElementRef;
  @ViewChild('reconnect') reconnectButton: ElementRef;
  @ViewChild('login') loginButton: ElementRef;
  modal: boolean;
  constructor(private router: Router) { }

  ngOnInit(): void {
    this.modal = false;
    this.router.events.subscribe(result => {
        this.changeBackground();
    });
  }
  ngAfterViewInit(): void{
    this.changeBackground();
  }

  logIn(): void{
    this.router.navigateByUrl('/user/login');
  }
  register(): void{
    this.router.navigateByUrl('/user/register');
  }
  landing(): void{
    this.router.navigateByUrl('/');
  }
  changeBackground(): void{
    if (this.router.url === '/'){
      this.cardComponent.nativeElement.style.opacity = '0';
      this.reconnectButton.nativeElement.style.color = 'var(--darkGray)';
      this.loginButton.nativeElement.style.color = 'var(--darkGray)';
      this.modal = false;
    } else {
      this.cardComponent.nativeElement.style.opacity = '1';
      this.cardComponent.nativeElement.style.transition = '.4s';
      this.reconnectButton.nativeElement.style.color = 'white';
      this.loginButton.nativeElement.style.color = 'white';
      this.modal = true;
    }
  }
}
