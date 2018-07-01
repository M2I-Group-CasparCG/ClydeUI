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



    this._socketIo.mediaPlayerEdit()
    .subscribe((msg: string) => {

      const mediaPlayer = JSON.parse(msg);
      // console.log('__________');
      // console.log(msg);
      if (mediaPlayer.id === this.mediaPlayerId ) {
        // console.log(msg);
        this.currentMediaPlayer = mediaPlayer;

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
          // console.log(JSON.stringify(this.mediaPlayer.mediaList));
        }
        this.mediaPlayer.playlistId = mediaPlayer.playlist.id;
        this.mediaPlayer.currentIndex = mediaPlayer.currentIndex;
        // console.log(this.mediaPlayer.currentIndex);
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


  mediaPlayersGet() {
    // console.log('mediaPlayersGet');
    // console.log(this.casparId);
    this._apiCallService.producerGetAll(this.casparId)
      .subscribe(
        data => {
          this.mediaPlayers = new Map();
          let result;
          // console.log(JSON.stringify(data));
          result = data;
          result.forEach(element => {
            if (element[1].type === 'DDR') {
              // console.log('id');
              // console.log(element[0]);
              // console.log('id');
              console.log('_____________');
              console.log(element[0]);
              console.log(JSON.stringify(element[1]));
              this.mediaPlayers.set(element[0], element[1]);
              console.log(JSON.stringify(this.mediaPlayers));
            }
          });
          if (this.mediaPlayers.size > 0) {
            console.log('mediaPlayers Detected !');
            console.log(JSON.stringify(this.mediaPlayers));
            console.log(this.mediaPlayers.keys().next().value);
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
    console.log('seek' + seekedFrame);
    this._apiCallService.mediaPlayerSeek(this.casparId, this.mediaPlayerId, seekedFrame)
    .subscribe(
        data => {
          console.log(JSON.stringify(data));
        }
    );
    // this.mediaPlayer.barWidth = mediaPlayer.currentFileFrame / mediaPlayer.totalFileFrame * 100;

  }

  async setCasparId(id) {
    this.casparId = id;
    console.log('#######');
    console.log(id);
    await this.mediaPlayersGet();
    await this.mediaListGet();
  }

  async setMediaPlayerId(id) {
    console.log('MEDIA PLAYER CHANGED !!!');

    this.mediaPlayerId = parseInt(id, 10);
    // this.currentMediaPlayer = new Map();
    console.log('*****************');
    console.log(this.mediaPlayerId);
    console.log(this.casparId);
    // this.mediaPlayer.paused =  false;
    // this.mediaPlayer.playlistLoop = false;
    // this.mediaPlayer.autoPlay = true;
    // this.mediaPlayer.currentTime = '';
    // this.mediaPlayer.remainingTime = '';
    // this.mediaPlayer.currentIndex = -1;
    // this.mediaPlayer.totalFrame = -1;
    // this.mediaPlayer.mediaList = [];
    // this.mediaPlayer.playlistId =  -1;
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
    console.log(mediaIndex);
    this._apiCallService.playlistRemoveMedia(this.casparId, this.mediaPlayer.playlistId, mediaIndex)
    .subscribe(
        data => {
          console.log(JSON.stringify(data));
        }
      );
  }
}
