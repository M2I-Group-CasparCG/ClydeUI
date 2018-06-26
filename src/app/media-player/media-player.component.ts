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
  mediaList: Array<Object>;
  barWidth: Number;
  playlistId: Number;
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
  currentMediaPlayer = null;
  playlist = null;
  playlistIndex = -1;
  mediaList = new Map();

  // html variables

  currentMedia = null;
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

    this.mediaPlayer.currentTime = '';
    this.mediaPlayer.remainingTime = '';
    this.mediaPlayer.barWidth = 0;
    this.mediaPlayer.currentIndex = -1;
    this.mediaPlayer.paused = true;
    this.mediaPlayer.autoPlay = false;
    this.mediaPlayer.playlistLoop = false;
    this.mediaPlayer.mediaList = new Array();

    this._socketIo.mediaPlayerEdit()
    .subscribe((msg: string) => {

      const mediaPlayer = JSON.parse(msg);
      if (mediaPlayer.id === this.mediaPlayerId ) {
        // console.log(msg);
        this.currentMediaPlayer = mediaPlayer;

        // récupération des éléments
        this.mediaPlayer.currentTime = mediaPlayer.formattedFileTime;
        this.mediaPlayer.remainingTime = mediaPlayer.formattedRemainingTime;
        this.mediaPlayer.barWidth = mediaPlayer.currentFileFrame / mediaPlayer.totalFileFrame * 100;
        this.mediaPlayer.paused = mediaPlayer.paused;
        this.mediaPlayer.autoPlay = mediaPlayer.autoPlay;
        this.mediaPlayer.playlistLoop = mediaPlayer.playlistLoop;
        if (JSON.stringify(this.mediaPlayer.mediaList) !== JSON.stringify(mediaPlayer.playlist.list)) {
          this.mediaPlayer.mediaList = mediaPlayer.playlist.list;
        }
        this.mediaPlayer.playlistId = mediaPlayer.playlist.id;
        this.mediaPlayer.currentIndex = mediaPlayer.currentIndex;
        console.log(this.mediaPlayer.currentIndex);
      }
      // console.log('___________');
      // console.log(mediaPlayer.currentIndex);
      // console.log('___________');
    });

    this._socketIo.playlistEdit()
    .subscribe((msg: string) => {
      const playlist = JSON.parse(msg);
      if (playlist.id === this.mediaPlayer.playlistId) {
        this.mediaPlayer.mediaList = playlist.list;
      }
    });



  }

  AfterViewInit() {

  }


  mediaPlayerEditAnalysis (object) {
    // console.log(JSON.stringify(object.id));
    // if (this.casparId !== null && this.currentMediaPlayer !== null) {

    //   if (object.id === this.currentMediaPlayer.id) {
    //     switch (object.property) {
    //       case 'paused' : {
    //         this.mediaPlayers.get(object.id).paused = object.value;
    //         this.paused = object.value;
    //       }break;
    //       case 'currentMedia' : {
    //         this.mediaPlayers.get(object.id).currentMedia = object.value;
    //         this.currentMedia = object.value;
    //         this.currentMediaPath = object.value.fullPath;
    //       }break;
    //       case 'autoPlay' : {
    //         this.mediaPlayers.get(object.id).autoPlay = object.value;
    //         this.playlistAutoPlay = object.value;
    //       }break;
    //       case 'playlistLoop' : {
    //         this.mediaPlayers.get(object.id).playlistLoop = object.value;
    //         this.playlistLoop = object.value;
    //       }break;
    //       case 'fileTime' : {
    //         this.mediaPlayers.get(object.id).fileTime = object.value;
    //       }break;
    //       case 'formattedFileTime' : {
    //         this.mediaPlayers.get(object.id).formattedFileTime = object.value;
    //         this.currentTime = object.value;
    //       }break;
    //       case 'remainingTime' : {
    //         this.mediaPlayers.get(object.id).remainingTime = object.value;
    //       }break;
    //       case 'formattedRemainingTime' : {
    //         this.mediaPlayers.get(object.id).formattedRemainingTime = object.value;
    //         this.remainingTime = object.value;
    //       }break;
    //       case 'currentFileFrame' : {
    //         this.mediaPlayers.get(object.id).currentFileFrame = object.value;
    //         this.barWidth =  object.value /  this.currentMedia.frameNumber * 100;
    //       }break;
    //       case 'currentIndex' : {
    //         this.mediaPlayers.get(object.id).currentIndex = object.value;
    //         this.currentIndex = object.value;
    //       }break;
    //     }
    //   }
  // }
}
  mediaPlayersGet() {
    // console.log('mediaPlayersGet');
    // console.log(this.casparId);
    this._apiCallService.producerGetAll(this.casparId)
      .subscribe(
        data => {
          this.mediaPlayers = new Map();
          let result;
          console.log(JSON.stringify(data));
          result = data;
          result.forEach(element => {
            if (element[1].type === 'DDR') {
              // console.log('id');
              // console.log(element[0]);
              // console.log('id');
              // console.log(JSON.stringify(element[1]));
              this.mediaPlayers.set(element[0], element[1]);
            }
          });
          if (this.mediaPlayers.size > 0) {
            console.log('mediaPlayers Detected !');

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

  async setMediaPlayerId(id) {
    console.log('MEDIA PLAYER CHANGED !!!');

    this.mediaPlayerId = parseInt(id, 10);
    this.currentMediaPlayer = new Map();
    console.log(this.mediaPlayerId);
    console.log(this.casparId);
    console.log(JSON.stringify(this.mediaPlayers));

    /**
     * init values
     */
    await this.mediasGet();

    // console.log('____________');
    // console.log(JSON.parse(this.playlist));
    // this.currentMediaPlayer = this.mediaPlayers.get(id);
    // this.currentMedia = this.currentMediaPlayer.currentMedia;
    // this.currentIndex = this.currentMediaPlayer.currentIndex;
    // this.currentMediaPath = this.currentMediaPlayer.currentMedia.fullPath;
    // this.playlistAutoPlay = this.currentMediaPlayer.autoPlay;
    // this.playlistLoop = this.currentMediaPlayer.playlistLoop;
    // this.barWidth = this.currentMediaPlayer.currentFileFrame /  this.currentMedia.frameNumber * 100;
    // this.paused = this.currentMediaPlayer.paused;
    // this.currentTime = this.currentMediaPlayer.formattedFileTime;
    // this.remainingTime = this.currentMediaPlayer.formattedRemainingTime;

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
    console.log(mediaIndex);
    this._apiCallService.playlistRemoveMedia(this.casparId, this.mediaPlayer.playlistId, mediaIndex)
    .subscribe(
        data => {
          console.log(JSON.stringify(data));
        }
      );
  }
}
