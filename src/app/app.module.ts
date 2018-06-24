import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { SwitchBar2dComponent } from './switch-bar-2d/switch-bar-2d.component';

//
import { HttpClientModule } from '@angular/common/http';  // prise en charge HTTP client pour api  calls
import { ApiCallService } from './api-call.service';
import { SocketIoService } from './socket-io.service';
import { CasparGetService } from './caspar-get.service';
import { IoConfigComponent } from './settings/caspars-settings/io-config/io-config.component';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CasparAddComponent } from './settings/caspars-settings/caspar-add/caspar-add.component';
import { CasparsListComponent } from './settings/caspars-settings/caspars-list/caspars-list.component';
import { CasparSelectComponent } from './caspar-select/caspar-select.component';
// tslint:disable-next-line:max-line-length
import { FileProducerFormComponent } from './settings/caspars-settings/io-config/producers-settings/producer-add/file-producer-form/file-producer-form.component';
// tslint:disable-next-line:max-line-length
import { StreamProducerFormComponent } from './settings/caspars-settings/io-config/producers-settings/producer-add/stream-producer-form/stream-producer-form.component';
// tslint:disable-next-line:max-line-length
import { DecklinkProducerFormComponent } from './settings/caspars-settings/io-config/producers-settings/producer-add/decklink-producer-form/decklink-producer-form.component';
import { SettingsComponent } from './settings/settings.component';
import { CasparsSettingsComponent } from './settings/caspars-settings/caspars-settings.component';
import { ProducersSettingsComponent } from './settings/caspars-settings/io-config/producers-settings/producers-settings.component';
import { ConsumersSettingsComponent } from './settings/caspars-settings/io-config/consumers-settings/consumers-settings.component';
// tslint:disable-next-line:max-line-length
import { DecklinkConsumerFormComponent } from './settings/caspars-settings/io-config/consumers-settings/consumer-add/decklink-consumer-form/decklink-consumer-form.component';
// tslint:disable-next-line:max-line-length
import { FileConsumerFormComponent } from './settings/caspars-settings/io-config/consumers-settings/consumer-add/file-consumer-form/file-consumer-form.component';
// tslint:disable-next-line:max-line-length
import { StreamConsumerFormComponent } from './settings/caspars-settings/io-config/consumers-settings/consumer-add/stream-consumer-form/stream-consumer-form.component';
import { ProducerAddComponent } from './settings/caspars-settings/io-config/producers-settings/producer-add/producer-add.component';
import { ProducersListComponent } from './settings/caspars-settings/io-config/producers-settings/producers-list/producers-list.component';
import { ConsumerAddComponent } from './settings/caspars-settings/io-config/consumers-settings/consumer-add/consumer-add.component';
import { ConsumersListComponent } from './settings/caspars-settings/io-config/consumers-settings/consumers-list/consumers-list.component';
// tslint:disable-next-line:max-line-length
import { ScreenConsumerFormComponent } from './settings/caspars-settings/io-config/consumers-settings/consumer-add/screen-consumer-form/screen-consumer-form.component';
import { OutputMatrixComponent } from './output-matrix/output-matrix.component';
import { LivePageComponent } from './live-page/live-page.component';
import { MediaPlayerComponent } from './media-player/media-player.component';

@NgModule({
  declarations: [
    AppComponent,
    SwitchBar2dComponent,
    IoConfigComponent,
    CasparAddComponent,
    CasparsListComponent,
    CasparSelectComponent,
    FileProducerFormComponent,
    StreamProducerFormComponent,
    DecklinkProducerFormComponent,
    SettingsComponent,
    CasparsSettingsComponent,
    ProducersSettingsComponent,
    ConsumersSettingsComponent,
    DecklinkConsumerFormComponent,
    FileConsumerFormComponent,
    StreamConsumerFormComponent,
    ProducerAddComponent,
    ProducersListComponent,
    ConsumerAddComponent,
    ConsumersListComponent,
    ScreenConsumerFormComponent,
    OutputMatrixComponent,
    LivePageComponent,
    MediaPlayerComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [
    ApiCallService,
    SocketIoService,
    CasparGetService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
