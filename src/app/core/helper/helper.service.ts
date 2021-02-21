import { Injectable } from '@angular/core';
import {KeyValue} from '@angular/common';
import {ConstantService} from '../constant/constant.service';
import {Observable, throwError} from 'rxjs';
import {HttpClient, HttpErrorResponse, HttpHeaders} from '@angular/common/http';
import {catchError} from 'rxjs/operators';
import {ToastrService} from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class HelperService {

  constructor(private constants: ConstantService, private http: HttpClient, private toaster: ToastrService) { }

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

  requestCall(method, api, data?: any, httpOptions?): Observable<any> {
    let response;
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
  handleFileInput(files, user): void {
    const validImageTypes = ['image/gif', 'image/jpeg', 'image/png', 'image/jpg'];
    if (validImageTypes.includes(files[0].type)) {
      const reader = new FileReader();
      if (files && files.length) {
        const file = files.item(0);
        user.fileUpload = file;
        reader.readAsDataURL(file);
        reader.onload = () => {
          user.image = reader.result as string;
        };
      }
    } else {
      this.toaster.error('Invalid image format');
    }
  }
}
