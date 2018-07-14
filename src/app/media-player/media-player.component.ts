import { Component, OnInit, AfterViewInit } from '@angular/core';
import { ApiCallService } from '../api-call.service';
import { SocketIoService } from '../socket-io.service';

class MediaPlayer {
  paused: boolean;
  playlistLoop: boolean;
  autoPlay: boolean;
  currentTime: String;
  remainingTime: String;
  currentIndex: Number;
  totalFrame: number;
  mediaList: Array<Object>;
  barWidth: Number;
  playlistId: Number;
}

class Media {
  fullPath: string;
}

@Component({
  selector: 'clydeui-media-player',
  templateUrl: './media-player.component.html',
  styleUrls: [
    './media-player.component.less',
    '../style/common.less']
})
export class MediaPlayerComponent implements OnInit {

  casparId = -1;
  mediaPlayerId = -1;
  mediaPlayers = new Map();
  currentMediaPlayer = new Object();
  playlist = null;
  playlistIndex = -1;
  mediaList = new Map();

  // html variables

  currentMedia = new Object();
  currentIndex;
  currentMediaPath = '';
  currentTime = '';
  remainingTime = '';
  barWidth = 1;

  paused = true;
  playlistLoop = false;
  playlistAutoPlay = false;

  mediaPlayer = new MediaPlayer();

  constructor(
    private _apiCallService: ApiCallService,
    private _socketIo: SocketIoService) { }

  ngOnInit() {
    this.currentMediaPlayer['currentMedia'] = new Object();
    this.mediaPlayer.paused = true;
    this.mediaPlayer.mediaList = new Array();
    this._socketIo.mediaPlayerEdit()
    .subscribe((msg: string) => {
      const mediaPlayer = JSON.parse(msg);
      if (mediaPlayer.id === this.mediaPlayerId ) {
        this.currentMediaPlayer = mediaPlayer;
        console.log('player edit');
        // récupération des éléments
        this.mediaPlayer.currentTime = mediaPlayer.formattedFileTime;
        this.mediaPlayer.remainingTime = mediaPlayer.formattedRemainingTime;
        this.mediaPlayer.barWidth = mediaPlayer.fileTime / mediaPlayer.currentMedia.duration * 100;
        this.mediaPlayer.paused = mediaPlayer.paused;
        this.mediaPlayer.autoPlay = mediaPlayer.autoPlay;
        this.mediaPlayer.totalFrame = parseInt(mediaPlayer.totalFileFrame, 10);
        this.mediaPlayer.playlistLoop = mediaPlayer.playlistLoop;
        if (JSON.stringify(this.mediaPlayer.mediaList) !== JSON.stringify(mediaPlayer.playlist.list)) {
          this.mediaPlayer.mediaList = mediaPlayer.playlist.list;
        }
        this.mediaPlayer.playlistId = mediaPlayer.playlist.id;
        this.mediaPlayer.currentIndex = mediaPlayer.currentIndex;
      }
    });

    this._socketIo.playlistEdit()
    .subscribe((msg: string) => {
      const playlist = JSON.parse(msg);
      if (playlist.id === this.mediaPlayer.playlistId) {
        this.mediaPlayer.mediaList = playlist.list;
      }
    });



  }


  mediaPlayersGet() {
    this._apiCallService.producerGetAll(this.casparId)
      .subscribe(
        data => {
          this.mediaPlayers = new Map();
          let result;
          result = data;
          result.forEach(element => {
            if (element[1].type === 'DDR') {
              this.mediaPlayers.set(element[0], element[1]);
            }
          });
          if (this.mediaPlayers.size > 0) {
            this.setMediaPlayerId(this.mediaPlayers.keys().next().value);

          }
        }
      );
  }

  mediaListGet() {
    this._apiCallService.casparGetMedias(this.casparId)
    .subscribe(
      data => {
        this.mediaList = new Map();
        let result;
        result = data;
        result.forEach(element => {
          this.mediaList.set(element[0], element[1]);
        });
      }
    );
  }

  async mediasGet() {
    await this._apiCallService.mediaPlayerGetPlaylist(this.casparId, this.mediaPlayerId)
      .subscribe(
        data => {
          let element;
          element = data;
          this.mediaPlayer.mediaList = element.list;
          this.mediaPlayer.playlistId = element.id;
        }
      );
  }

  /**
   * TRANSPORTS
   */
  mediaPlayerPlay () {
    if (this.mediaPlayer.paused) {
      this._apiCallService.mediaPlayerPlay(this.casparId, this.mediaPlayerId)
      .subscribe(
        data => {
          console.log(JSON.stringify(data));
        }
      );
    } else {
      this._apiCallService.mediaPlayerPause(this.casparId, this.mediaPlayerId)
      .subscribe(
        data => {
          console.log(JSON.stringify(data));
        }
      );
    }
  }

  mediaPlayerPlayId (index) {
    this._apiCallService.mediaPlayerPlayId(this.casparId, this.mediaPlayerId, index)
    .subscribe(
      data => {
      }
    );
  }

  mediaPlayerPause () {
    this._apiCallService.mediaPlayerPause(this.casparId, this.mediaPlayerId)
      .subscribe(
        data => {
        }
      );
  }

  mediaPlayerStop () {
    this._apiCallService.producerStop(this.casparId, this.mediaPlayerId)
    .subscribe(
      data => {
      }
    );
  }


  mediaPlayerNext () {
    this._apiCallService.mediaPlayerNext(this.casparId, this.mediaPlayerId)
    .subscribe(
      data => {
      }
    );
  }

  mediaPlayerPrevious () {
    this._apiCallService.mediaPlayerPrevious(this.casparId, this.mediaPlayerId)
    .subscribe(
      data => {
      }
    );
  }

  /**
   * Playlist
   */
  setPlaylistLoop () {
    this._apiCallService.mediaPlayerPlaylistLoop(this.casparId, this.mediaPlayerId)
      .subscribe(
          data => {
            console.log(JSON.stringify(data));
          }
        );
  }

  setPlaylistAutoPlay () {
      this._apiCallService.mediaPlayerAutoPlay(this.casparId, this.mediaPlayerId)
      .subscribe(
          data => {
            console.log(JSON.stringify(data));
          }
      );
  }

  seekMedia(event) {
    const seekedFrame = Math.floor(event.offsetX / document.getElementById('progressBar').offsetWidth * this.mediaPlayer.totalFrame);
    this._apiCallService.mediaPlayerSeek(this.casparId, this.mediaPlayerId, seekedFrame)
    .subscribe(
        data => {
          console.log(JSON.stringify(data));
        }
    );

  }

  async setCasparId(id) {
    this.casparId = id;
    this.mediaPlayersGet();
    this.mediaListGet();
  }

  async setMediaPlayerId(id) {
    this.mediaPlayerId = parseInt(id, 10);
    await this.mediasGet();

  }

  addMedia(mediaId) {
    this._apiCallService.playlistAddMedia(this.casparId, this.mediaPlayer.playlistId, mediaId)
      .subscribe(
          data => {
            console.log(JSON.stringify(data));
          }
        );
  }
  removeMedia(mediaIndex) {
    this._apiCallService.playlistRemoveMedia(this.casparId, this.mediaPlayer.playlistId, mediaIndex)
    .subscribe(
        data => {
          console.log(JSON.stringify(data));
        }
      );
  }
}
