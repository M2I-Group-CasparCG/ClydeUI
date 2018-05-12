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
    * Caspars
    */
  casparAdd = () => {
    return Observable.create((observer) => {
      this.socket.on('casparAdd', (msg) => {
        observer.next(msg);
      });
    });
  }

  casparEdit = () => {
    return Observable.create((observer) => {
      this.socket.on('casparEdit', (msg) => {
        observer.next(msg);
      });
    });
  }

  casparDelete = () => {
    return Observable.create((observer) => {
      this.socket.on('casparDelete', (msg) => {
        observer.next(msg);
      });
    });
  }

   /**
   *  Producers
   */
  producerAdd = () => {
    return Observable.create((observer) => {
      this.socket.on('producerAdd', (msg) => {
        observer.next(msg);
      });
    });
  }

  producerEdit = () => {
    return Observable.create((observer) => {
      this.socket.on('producerEdit', (msg) => {
        console.log(msg);
        observer.next(msg);
      });
    });
  }

  producerDelete = () => {
    return Observable.create((observer) => {
      this.socket.on('producerDelete', (msg) => {
        console.log(msg);
        observer.next(msg);
      });
    });
  }

     /**
   *  Consumers
   */
  consumerAdd = () => {
    return Observable.create((observer) => {
      this.socket.on('consumerAdd', (msg) => {
        observer.next(msg);
      });
    });
  }

  consumerEdit = () => {
    return Observable.create((observer) => {
      this.socket.on('consumerEdit', (msg) => {
        console.log(msg);
        observer.next(msg);
      });
    });
  }

  consumerDelete = () => {
    return Observable.create((observer) => {
      this.socket.on('consumerDelete', (msg) => {
        console.log(msg);
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
