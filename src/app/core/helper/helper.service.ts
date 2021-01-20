import { Injectable } from '@angular/core';
import {KeyValue} from '@angular/common';
import {ConstantService} from '../constant/constant.service';
import {Observable, throwError} from 'rxjs';
import {HttpClient, HttpErrorResponse, HttpHeaders} from '@angular/common/http';
import {catchError} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class HelperService {

  constructor(private constants: ConstantService, private http: HttpClient) { }

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

  toggleTeamMember(i, member, selectedTeam): void{
    const tick = document.getElementById(i).children[0];
    const border = document.getElementById(i).children[1];
    //console.log(member);
    if (getComputedStyle(tick).display === 'block') {
      (tick as HTMLImageElement).style.display = 'none';
      (border as HTMLImageElement).style.border = 'none';
      const index = selectedTeam.findIndex((x) => x === member);
      selectedTeam.splice(index, 1);
    } else {
      (tick as HTMLImageElement).style.display = 'block';
      (border as HTMLImageElement).style.border = '1px solid var(--green)';
      selectedTeam.push(member);
    }
  }
  originalOrder = (a: KeyValue<number, string>, b: KeyValue<number, string>): number => {
    return 0;
  }

  requestCall(method, api, data?: any): Observable<any> {
    let response;
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
      })
    };
    switch (method) {
      case this.constants.apiMethod.post:
        response = this.http.post(api, data, httpOptions);
        break;
      case this.constants.apiMethod.get:
        response = this.http.get(api);
        break;
      case this.constants.apiMethod.put:
        response = this.http.put(api, data);
        break;
      case this.constants.apiMethod.delete:
        response = this.http.delete(api);
        break;
      default:
        break;
    }
    return response;
  }
  // handleError(error: HttpErrorResponse, self) {
  //   //self.logoutError(error.status);
  //   if (error.error instanceof ErrorEvent) {
  //     // A client-side or network error occurred. Handle it accordingly.
  //     // console.error('An error occurred:', error.error.message);
  //   } else {
  //     // The backend returned an unsuccessful response code.
  //     // The response body may contain clues as to what went wrong,
  //     // console.error(
  //     //   `Backend returned code ${error.status}, ` +
  //     //   `body was: ${error.message}`);
  //   }
  //   // return an observable with a user-facing error message
  //   // let msg = error.error.email ? error.error.email[0] : 'Something bad happened, Please try again later.';
  //   return throwError({error: error.message, status: error.status});
  // }
}
