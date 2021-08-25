import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import * as io from 'socket.io-client';
import { environment } from 'src/environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class WebSocketService {
  socket: any;
  API_URI = environment.API_URI; // URL de Backend


  constructor() {
    this.socket = io(this.API_URI);
  }
  // tslint:disable-next-line: typedef
  listen(eventName: string) {
    return new Observable((subscribe) => {
      this.socket.on(eventName, (data) => {
        subscribe.next(data);
      });
    });
  }
  // tslint:disable-next-line: typedef
  emit(eventName: string, data: any) {
    this.socket.emit(eventName, data);
  }
}
