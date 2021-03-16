import {Directive, ElementRef, OnDestroy} from '@angular/core';

@Directive({
  selector: '[appDomChanges]'
})
export class DomChangesDirective implements OnDestroy{
  observer: any;
  constructor(element: ElementRef) {
    this.observer = new MutationObserver(mutations => {
      mutations.forEach((mutation) => {
        if (mutation.addedNodes.length && mutation.addedNodes[0].nodeType !== 8){
          console.log(mutation.addedNodes);
        } else if ((!mutation.addedNodes.length)){
          console.log('false', mutation.addedNodes);
        } else if (mutation.removedNodes){
          console.log(mutation);
        }
      });
    });
    const config = { attributes: true, childList: true, characterData: true,};
    this.observer.observe(element.nativeElement, config);
  }
  ngOnDestroy(): void {
    this.observer.disconnect();
  }
}
