import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class HelperService {

  constructor() { }

  setModalPosition(): void {
    const modal = document.getElementsByClassName('modal-content') as HTMLCollectionOf<HTMLElement>;
    const index = modal.length - 1;
    modal[index].style.width = 'fit-content';
    modal[index].style.border = 'none';
    modal[index].style.borderRadius = '.7vw';
    modal[index].parentElement.style.left = '8vw';
    modal[index].parentElement.style.justifyContent = 'center';
    modal[index].parentElement.style.transition = ' -webkit-transform none';
    modal[index].parentElement.style.transition = 'none';
    modal[index].parentElement.style['-webkit-transform'] = 'translate(0,0)';
    modal[index].parentElement.style.transform = 'transform: translate(0,0)';
    modal[index].parentElement.parentElement.style.overflowY = 'hidden';
    const backdrop = modal[index].parentElement.parentElement.previousSibling as HTMLElement;
    backdrop.style.position = 'absolute';
    backdrop.style.background = '#282C33';
    backdrop.style.borderTopRightRadius = '.5vw';
    backdrop.style.borderTopLeftRadius = '.5vw';
  }
}
