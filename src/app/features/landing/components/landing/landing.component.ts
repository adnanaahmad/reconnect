import {AfterViewInit, Component, ElementRef, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {Router} from '@angular/router';
import {Subscription} from 'rxjs';
import {ConstantService} from '../../../../core/constant/constant.service';
import {HelperService} from '../../../../core/helper/helper.service';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.scss']
})
export class LandingComponent implements OnInit, AfterViewInit, OnDestroy {
  @ViewChild('login') loginButton: ElementRef;
  @ViewChild('signup') registerButton: ElementRef;
  loginModal: boolean;
  subscription: Subscription;
  button: any;
  constructor(public router: Router,
              public constant: ConstantService,
              public helper: HelperService,) { }

  ngOnInit(): void {
    this.showModal();
  }
  ngAfterViewInit(): void{
    this.changeBackground();
    this.subscription = this.router.events.subscribe(() => {
      this.changeBackground();
      this.highlightActiveTab();
    });
  }
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  logIn(): void{
    this.router.navigateByUrl('/login').then();
  }
  register(): void{
    this.router.navigateByUrl('/register').then();
  }
  changeBackground(): void{
    if (this.landingRoute){
      this.changeBackgroundHelper(
          false,
          '0',
          '0',
          'var(--darkGray)',
          'transparent',
          'transparent'
      );
    } else if (this.router.url === '/login'){
      this.changeBackgroundHelper(
          true, '1',
          '0',
          'white',
          'var(--green)',
          'transparent'
      );
    } else if (this.router.url === '/forgotPassword'){
      this.changeBackgroundHelper(
          true, '1',
          '0',
          'white',
          'transparent',
          'transparent'
      );
    } else {
      this.changeBackgroundHelper(
          true,
          '1',
          '0',
          'white',
          'transparent',
          'var(--green)'
      );
    }
  }
  changeBackgroundHelper(modal, opacity, transition, color, loginBackground, registerBackground): void{
    this.loginModal = modal;
    this.loginButton.nativeElement.style.color = color;
    this.registerButton.nativeElement.style.color = color;
    this.loginButton.nativeElement.style.background = loginBackground;
    this.registerButton.nativeElement.style.background = registerBackground;
  }
  showModal(): void{
    this.loginModal = !this.landingRoute;
    this.highlightActiveTab();
  }
  activeTab(data): void{
    this.button = data.name;
    this.router.navigateByUrl(data.route).then();
  }
  get landingRoute(): boolean{
    return (this.router.url === '/homePage' || this.router.url === '/about' || this.router.url === '/buyHome' ||
        this.router.url === '/sellHome' || this.router.url === '/becomeAgent' || this.router.url.includes('/privacy') ||
        this.router.url.includes('/terms'));
  }
  highlightActiveTab(): void{
    !this.landingRoute ? this.button = null : this.button = (this.constant.LANDING_MENU.find( x => x.route === this.router.url)) ?
        (this.constant.LANDING_MENU.find( x => x.route === this.router.url)).name : null;
  }
  topFunction(): void {
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
  }
}
