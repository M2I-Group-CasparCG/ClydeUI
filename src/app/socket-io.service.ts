import { Injectable } from '@angular/core';
import * as socketIo from 'socket.io-client';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class SocketIoService {

  public socket;

  constructor() {
    this.socket = socketIo.connect('http://localhost:3001');
   }

   /**
   *  Producers
   */
  producerAdded = () => {
    return Observable.create((observer) => {
      this.socket.on('producerAdded', (msg) => {
        observer.next(msg);
      });
    });
  }

  producerRemoved = () => {
    return Observable.create((observer) => {
      this.socket.on('producerRemoved', (msg) => {
        observer.next(msg);
      });
    });
  }

  /**
   *  Channels
   */
  channelAdded = () => {
    return Observable.create((observer) => {
      this.socket.on('channelAdded', (msg) => {
        observer.next(msg);
      });
    });
  }
  inputSwitched = () => {
    return Observable.create((observer) => {
      this.socket.on('inputSwitched', (msg) => {
        observer.next(msg);
      });
    });
  }

  /**
   * State
   */
  state = () => {
    return Observable.create((observer) => {
      this.socket.on('state', (msg) => {
        observer.next(msg);
      });
    });
  }

}
