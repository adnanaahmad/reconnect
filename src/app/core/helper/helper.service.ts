import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class HelperService {

  constructor() { }

  setModalPosition(): void {
    const modal = document.getElementsByClassName('modal-content') as HTMLCollectionOf<HTMLElement>;
    modal[0].style.width = 'fit-content';
    modal[0].style.borderRadius = '.7vw';
    modal[0].parentElement.style.justifyContent = 'center';
    modal[0].parentElement.parentElement.style.position = 'absolute';
    modal[0].parentElement.parentElement.style.overflowY = 'hidden';
    const backdrop = modal[0].parentElement.parentElement.previousSibling as HTMLElement;
    backdrop.style.position = 'absolute';
    backdrop.style.background = '#282C33';
    backdrop.style.borderTopRightRadius = '.5vw';
    backdrop.style.borderTopLeftRadius = '.5vw';
  }
}
