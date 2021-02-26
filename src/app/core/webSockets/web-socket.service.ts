import { Injectable } from '@angular/core';
import * as io from 'socket.io-client';
import {environment} from '../../../environments/environment';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WebSocketService {
  socket: any;
  constructor() {
    this.socket = io(environment.serverUrl, {query: {token: localStorage.getItem('token')}});
    this.socket.on('disconnect', () => {
      console.log('socket has disconnected');
    });
    this.socket.on('connect', () => {
      console.log('socket has connected');
    });
  }
  listen(eventName: string): Observable<any>{
    return new Observable<any>((subscriber) => {
      this.socket.on(eventName, (data) => {
        subscriber.next(data);
      });
    });
  }
  emit(eventName: string, data): void{
    this.socket.emit(eventName, data);
  }
}
