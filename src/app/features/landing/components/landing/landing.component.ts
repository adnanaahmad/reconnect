import {AfterViewInit, ChangeDetectorRef, Component, ElementRef, OnInit, ViewChild} from '@angular/core';
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
  @ViewChild('signup') registerButton: ElementRef;
  modal: boolean;
  constructor(private router: Router, private cdr: ChangeDetectorRef) { }

  ngOnInit(): void {
    this.showModal();
  }
  ngAfterViewInit(): void{
    this.changeBackground();
    this.router.events.subscribe(result => {
      this.changeBackground();
    });
  }

  logIn(): void{
    this.router.navigateByUrl('/login');
  }
  register(): void{
    this.router.navigateByUrl('/register');
  }
  landing(): void{
    this.router.navigateByUrl('/');
  }
  changeBackground(): void{
    if (this.router.url === '/'){
      this.changeBackgroundHelper(
          false,
          '0',
          '0s',
          'var(--darkGray)',
          'transparent',
          'transparent'
      );
    } else if (this.router.url === '/login'){
      this.changeBackgroundHelper(
          true, '1',
          '0.4s',
          'white',
          'var(--green)',
          'transparent'
      );
    } else {
      this.changeBackgroundHelper(
          true,
          '1',
          '0.4s',
          'white',
          'transparent',
          'var(--green)'
      );
    }
  }
  changeBackgroundHelper(modal, opacity, transition, color, loginBackground, registerBackground): void{
    this.modal = modal;
    this.cardComponent.nativeElement.style.opacity = opacity;
    this.cardComponent.nativeElement.style.transition = transition;
    this.reconnectButton.nativeElement.style.color = color;
    this.loginButton.nativeElement.style.color = color;
    this.registerButton.nativeElement.style.color = color;
    this.loginButton.nativeElement.style.background = loginBackground;
    this.registerButton.nativeElement.style.background = registerBackground;
  }
  showModal(): void{
    this.modal = this.router.url !== '/';
  }
}
