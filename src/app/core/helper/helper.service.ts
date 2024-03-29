import { Injectable } from '@angular/core';
import {KeyValue} from '@angular/common';
import {ConstantService} from '../constant/constant.service';
import {Observable, throwError} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {ToastrService} from 'ngx-toastr';
import {NgxImageCompressService} from 'ngx-image-compress';
import {ValidateFn} from 'codelyzer/walkerFactory/walkerFn';
import {AbstractControl} from '@angular/forms';
import * as moment from 'moment';
import * as S3 from 'aws-sdk/clients/s3';
import {environment} from '../../../environments/environment';
import {StoreService} from '../store/store.service';
@Injectable({
  providedIn: 'root'
})
export class HelperService {

  constructor(private constants: ConstantService,
              private http: HttpClient,
              private toaster: ToastrService,
              private imageCompress: NgxImageCompressService,
              private store: StoreService) { }

  setModalPosition(): void {
    const modal = document.getElementsByClassName('modal-content') as HTMLCollectionOf<HTMLElement>;
    const index = modal.length - 1;
    modal[index].style.width = 'max-content';
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
      if (Number(files[0].size) < 3145728) {
        const reader = new FileReader();
        if (files && files.length) {
          const file = files.item(0);
          reader.readAsDataURL(file);
          reader.onload = (event) => {
            this.imageCompression(event.target.result, user);
            user.image = reader.result as string;
          };
        }
      } else {
        this.toaster.error('File size is greater than 3 Mb');
      }
    } else {
      this.toaster.error('Invalid image format');
    }
  }
  formatRole(data): string{
    return data.split(/(?=[A-Z])/).join(' ');
  }
  imageCompression(image, user): void{
//    console.warn('Size in bytes was:', this.imageCompress.byteCount(image));
    this.imageCompress.compressFile(image, -1, 50, 50).then(
        result => {
//          console.warn('Size in bytes is now:', this.imageCompress.byteCount(result));
          user.fileUpload = this.dataURItoBlob(result.split(',')[1]);
        }
    );
  }
  dataURItoBlob(dataURI): Blob {
    const byteString = window.atob(dataURI);
    const arrayBuffer = new ArrayBuffer(byteString.length);
    const int8Array = new Uint8Array(arrayBuffer);
    for (let i = 0; i < byteString.length; i++) {
      int8Array[i] = byteString.charCodeAt(i);
    }
    const blob = new Blob([int8Array], { type: 'image/jpeg' });
    return blob;
  }
  downPaymentValidator(value: any): ValidateFn<any> {
    return (control: AbstractControl): any => {
      if ( parseFloat(control.value) < parseFloat(value)) {
        return { downPayment: true };
      }
      return null;
    };
  }
  getEmbeddedVideoURL(url): string {
    if (!url) {
      return null;
    }
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
    const match = url.match(regExp);

    return (match && match[2].length === 11)
        ? '//www.youtube.com/embed/' + match[2]
        : null;
  }
  handleApiError(error, msg): void {
    if (this.constants.RESPONSE_ERRORS[error.error.result.CODE]){
      this.toaster.error((error.error.result.details ? error.error.result.details.MESSAGE : error.error.result.MESSAGE));
    } else{
      this.toaster.error(`${msg}`);
    }
  }
  getMinimalisticRelativeTime(dateTime): string {
    if (!dateTime) {
      return null;
    }

    const today = moment();

    const time = moment(dateTime);

    const diff = today.diff(time);

    const duration = moment.duration(diff);
    if (duration.years() > 0) {
      return duration.years() + 'y';
    } else if (duration.weeks() > 0) {
      return duration.weeks() + 'w';
    } else if (duration.days() > 0) {
      return duration.days() + 'd';
    } else if (duration.hours() > 0) {
      return duration.hours() + 'h';
    } else if (duration.minutes() > 0) {
      return duration.minutes() + 'm';
    } else if (duration.minutes() < 1) {
      return '1s';
    }
  }
  uploadFile(file, format): void {
    const contentType = file.type;
    const bucket = new S3(environment.s3Bucket);
    const params = {
      Bucket: environment.s3BucketName,
      Key: file.name,
      Body: file,
      ACL: 'public-read',
      ContentType: contentType
    };
    this.store.updateProgressBarLoading(true);
    bucket.upload(params, (err, data) => {
      if (err) {
        this.toaster.error(`There was an error uploading your file: ${err}`);
        this.store.updateProgressBarLoading(false);
        (document.getElementById('media-img') as HTMLInputElement).value = null;
        (document.getElementById('media-vid') as HTMLInputElement).value = null;
        return false;
      }
      this.store.updateUploadFile({
        type: format,
        url:  data.Location
      });
      this.store.updateProgressBarLoading(false);
      console.log('Successfully uploaded file.', data);
      (document.getElementById('media-img') as HTMLInputElement).value = null;
      (document.getElementById('media-vid') as HTMLInputElement).value = null;
      return true;
    });
  }
  mediaUrlValidator(): ValidateFn<any> {
    return (control: AbstractControl): any => {
      if (!control.value){
        return null;
      }
      const validImageUrl = ((control.value).match(/\.(jpeg|jpg|gif|png)$/) != null);
      const validVideoUrl = ((control.value).match(/\.(mp4|ogg|webm)$/) != null);
      const validYoutubeUrl = !!(control.value).includes('youtube.com/watch');
      return !(validImageUrl || validVideoUrl || validYoutubeUrl) ? {validUrl: {value: control.value}} : null;
    };
  }
  validImageUrl(mediaUrl): boolean{
    return(mediaUrl.match(/\.(jpeg|jpg|gif|png)$/) != null);
  }
  validVideoUrl(mediaUrl): boolean{
    return(mediaUrl.match(/\.(mp4|ogg|webm)$/) != null);
  }
  validYoutubeUrl(mediaUrl): boolean{
    return !!mediaUrl.includes('youtube.com/watch');
  }
  getBase64ImageFromURL(url): Promise<any> {
    return new Promise((resolve, reject) => {
      const img = new Image();
      img.setAttribute('crossOrigin', 'anonymous');
      img.onload = () => {
        // tslint:disable-next-line:prefer-const
        const canvas = document.createElement('canvas');
        canvas.width = img.width;
        canvas.height = img.height;

        // tslint:disable-next-line:prefer-const
        const ctx = canvas.getContext('2d');
        ctx.drawImage(img, 0, 0);

        // tslint:disable-next-line:prefer-const
        const dataURL = canvas.toDataURL('image/png');
        resolve(dataURL);
      };

      img.onerror = error => {
        reject(error);
      };

      img.src = url;
    });
  }
}
