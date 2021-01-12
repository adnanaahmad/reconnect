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
      this.modal = false;
      this.cardComponent.nativeElement.style.opacity = '0';
      this.reconnectButton.nativeElement.style.color = 'var(--darkGray)';
      this.loginButton.nativeElement.style.color = 'var(--darkGray)';
    } else {
      this.modal = true;
      this.cardComponent.nativeElement.style.opacity = '1';
      this.cardComponent.nativeElement.style.transition = '.4s';
      this.reconnectButton.nativeElement.style.color = 'white';
      this.loginButton.nativeElement.style.color = 'white';
    }
    //this.cdr.detectChanges();
  }
  showModal(): void{
    this.modal = this.router.url !== '/';
  }
}
