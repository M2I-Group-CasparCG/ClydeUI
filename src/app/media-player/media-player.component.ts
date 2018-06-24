import { Component, OnInit, AfterViewInit } from '@angular/core';
import { ApiCallService } from '../api-call.service';
import { SocketIoService } from '../socket-io.service';

@Component({
  selector: 'clydeui-media-player',
  templateUrl: './media-player.component.html',
  styleUrls: [
    './media-player.component.less',
    '../style/common.less']
})
export class MediaPlayerComponent implements OnInit {

  casparId = null;
  mediaPlayerId = null;
  mediaPlayers = new Map();
  currentMediaPlayer = null;
  playlist = null;
  playlistIndex = 0;
  mediaList = null;

  // html variables

  currentMedia = null;
  currentMediaIndex;
  currentMediaPath = '';
  currentTime = '';
  remainingTime = '';
  barWidth = 1;

  paused = true;
  playlistLoop = false;
  playlistAutoPlay = false;

  constructor(
    private _apiCallService: ApiCallService,
    private _socketIo: SocketIoService) { }

  ngOnInit() {

    this._socketIo.mediaPlayerEdit()
    .subscribe((msg: string) => {
      const settings = JSON.parse(msg);
      if (settings instanceof Array) {
        settings.forEach(setting => {
          this.mediaPlayerEditAnalysis(setting);
        });
      } else {
          this.mediaPlayerEditAnalysis(settings);
      }

    });

    this._socketIo.playlistEdit()
    .subscribe((msg: string) => {
      this.playlist = JSON.parse(msg);
    });



  }

  AfterViewInit() {

  }


  mediaPlayerEditAnalysis (object) {
    if (this.casparId !== null && this.currentMediaPlayer !== null) {
      console.log('!');
      switch (object.property) {
        case 'paused' : {
          this.mediaPlayers.get(object.id).paused = object.value;
          this.paused = object.value;
        }break;
        case 'currentMedia' : {
          this.mediaPlayers.get(object.id).currentMedia = object.value;
          this.currentMedia = object.value;
          this.currentMediaPath = object.value.fullPath;
        }break;
        case 'autoPlay' : {
          this.mediaPlayers.get(object.id).autoPlay = object.value;
          this.playlistAutoPlay = object.value;
        }break;
        case 'playlistLoop' : {
          console.log('coucou');
          this.mediaPlayers.get(object.id).playlistLoop = object.value;
          this.playlistLoop = object.value;
        }break;
        case 'fileTime' : {
          this.mediaPlayers.get(object.id).fileTime = object.value;
        }break;
        case 'formattedFileTime' : {
          this.mediaPlayers.get(object.id).formattedFileTime = object.value;
          this.currentTime = object.value;
        }break;
        case 'remainingTime' : {
          this.mediaPlayers.get(object.id).remainingTime = object.value;
        }break;
        case 'formattedRemainingTime' : {
          this.mediaPlayers.get(object.id).formattedRemainingTime = object.value;
          this.remainingTime = object.value;
        }break;
        case 'currentFileFrame' : {
          this.mediaPlayers.get(object.id).currentFileFrame = object.value;
          this.barWidth =  object.value /  this.currentMedia.frameNumber * 100;
        }break;
        case 'currentMediaIndex' : {
          this.mediaPlayers.get(object.id).currentMediaIndex = object.value;
          this.currentMediaIndex = object.value;
        }break;
      }


  }
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

  mediasGet() {
    this._apiCallService.mediaPlayerGetPlaylist(this.casparId, this.mediaPlayerId)
      .subscribe(
        data => {
          this.playlist = data;
        }
      );
  }

  /**
   * TRANSPORTS
   */
  mediaPlayerPlay () {
    if (this.paused) {
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

  setCasparId(id) {
    this.casparId = id;
    this.mediaPlayersGet();
    this.mediaListGet();
  }

  setMediaPlayerId(id) {
    this.mediaPlayerId = id;
    /**
     * init values
     */

    this.currentMediaPlayer = this.mediaPlayers.get(id);

    this.currentMedia = this.currentMediaPlayer.currentMedia;
    this.currentMediaIndex = this.currentMediaPlayer.currentMediaIndex;
    this.currentMediaPath = this.currentMediaPlayer.currentMedia.fullPath;
    this.playlistAutoPlay = this.currentMediaPlayer.autoPlay;
    this.playlistLoop = this.currentMediaPlayer.playlistLoop;
    this.barWidth = this.currentMediaPlayer.currentFileFrame /  this.currentMedia.frameNumber * 100;
    this.paused = this.currentMediaPlayer.paused;
    this.currentTime = this.currentMediaPlayer.formattedFileTime;
    this.remainingTime = this.currentMediaPlayer.formattedRemainingTime;
    this.mediasGet();
  }

  addMedia(mediaId) {
    this._apiCallService.playlistAddMedia(this.casparId, this.playlist.id, mediaId)
      .subscribe(
          data => {
            console.log(JSON.stringify(data));
          }
        );
  }
  removeMedia(mediaIndex) {
    this._apiCallService.playlistRemoveMedia(this.casparId, this.playlist.id, mediaIndex)
    .subscribe(
        data => {
          console.log(JSON.stringify(data));
        }
      );
  }
}
