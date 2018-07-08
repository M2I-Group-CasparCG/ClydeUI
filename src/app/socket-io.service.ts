import { Injectable } from '@angular/core';
import * as socketIo from 'socket.io-client';
import { Observable } from 'rxjs/Observable';


class SocketIoSettings {
  ipAddr: string;
  port: number;
  url: string;
}

@Injectable()
export class SocketIoService {

  socketIoSettings = new SocketIoSettings();

  public socket;

  constructor() {
    this.socketIoSettings.ipAddr = '127.0.0.1';
    this.socketIoSettings.port = 3001;
    this.socketIoSettings.url = `http://${this.socketIoSettings.ipAddr}:${this.socketIoSettings.port}`;
    this.socket = socketIo.connect(this.socketIoSettings.url);
   }


  setSocketIoSettings(ipAddr, port) {
    this.socketIoSettings.ipAddr = ipAddr;
    this.socketIoSettings.port = port;
    this.socketIoSettings.url = `http://${this.socketIoSettings.ipAddr}:${this.socketIoSettings.port}`;
    this.socket.close();
    this.socket.disconnect();
    this.socket = socketIo.connect(this.socketIoSettings.url);
  }

  getSocketIoSettings() {
    return this.socketIoSettings;
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
        observer.next(msg);
      });
    });
  }

  producerDelete = () => {
    return Observable.create((observer) => {
      this.socket.on('producerDelete', (msg) => {
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
        console.log(JSON.stringify(msg));
        observer.next(msg);
      });
    });
  }

  consumerEdit = () => {
    return Observable.create((observer) => {
      this.socket.on('consumerEdit', (msg) => {
        observer.next(msg);
      });
    });
  }

  consumerDelete = () => {
    return Observable.create((observer) => {
      this.socket.on('consumerDelete', (msg) => {
        observer.next(msg);
      });
    });
  }


  /**
   *  Channels
   */
  channelAdd = () => {
    return Observable.create((observer) => {
      this.socket.on('channelAdd', (msg) => {
        observer.next(msg);
      });
    });
  }
  channelEdit = () => {
    return Observable.create((observer) => {
      this.socket.on('channelEdit', (msg) => {
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
   *  Layers
   */
  layerAdd = () => {
    return Observable.create((observer) => {
      this.socket.on('layerAdd', (msg) => {
        observer.next(msg);
      });
    });
  }
  layerEdit = () => {
    return Observable.create((observer) => {
      this.socket.on('layerEdit', (msg) => {
        observer.next(msg);
      });
    });
  }
  layerDelete = () => {
    return Observable.create((observer) => {
      this.socket.on('layerDelete', (msg) => {
        observer.next(msg);
      });
    });
  }

  /**
   * MediaPlayer
   */

   mediaPlayerEdit = () => {
    return Observable.create((observer) => {
      this.socket.on('ddrEdit', (msg) => {
        observer.next(msg);
      });
    });
   }

  /**
   * Recorder
   */
  recorderEdit = () => {
    return Observable.create((observer) => {
      this.socket.on('recorderEdit', (msg) => {
        observer.next(msg);
      });
    });
   }
  /**
   * Playlist
   */

  playlistEdit = () => {
    return Observable.create((observer) => {
      this.socket.on('playlistEdit', (msg) => {
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
  recordInfo = () => {
    return Observable.create((observer) => {
      this.socket.on('recordInfo', (msg) => {
        observer.next(msg);
      });
    });
  }

}
