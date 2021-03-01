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
  @ViewChild('signup') registerButton: ElementRef;
  modal: boolean;
  houses: Array<string>;
  team: Array<string>;
  constructor(private router: Router) { }

  ngOnInit(): void {
    this.showModal();
    this.houses = ['https://images.adsttc.com/media/images/5be9/fd5c/08a5/e5a5/8c00/008f/large_jpg/CARLES_FAUS_ARQUITECTURA_-_CARMEN_HOUSE_(2).jpg?1542061390',
    'https://nimvo.com/wp-content/uploads/2018/04/Modern-House.jpg',
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTnm8ECMJaAQu_rUUfaYZy-FQnl4XQbgsyLcA&usqp=CAU',
    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTahA0LYlzFA-K_B3pu8ruheyd1STRBMXTxbg&usqp=CAU'];
    this.team = ['https://bambiniphoto.sg/wp-content/uploads/Professional-Headshots-1.jpg',
    'https://www.marketingdonut.co.uk/sites/default/files/what-should-you-include-professional-profile142825543.jpg',
    'https://agencia-fotografia.com/wp-content/uploads/2019/08/Linkedin-photo-session.jpg',
    'https://lh3.googleusercontent.com/proxy/ec_Df4z9R571DwDdKk2Yi3vqDiDFm7HDS5Kq_DD856mOJX8916nlCE4j2r062r0I4RqfIQ9Cq0LhrsITfHMuZxXcBUtZI-gwQir93skLmAni3WoouA'];
  }
  ngAfterViewInit(): void{
    this.changeBackground();
    this.router.events.subscribe(() => {
      this.changeBackground();
    });
  }

  logIn(): void{
    this.router.navigateByUrl('/login').then();
  }
  register(): void{
    this.router.navigateByUrl('/register').then();
  }
  landing(): void{
    this.router.navigateByUrl('/').then();
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
    } else if (this.router.url === '/forgotPassword'){
      this.changeBackgroundHelper(
          true, '1',
          '0.4s',
          'white',
          'transparent',
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
