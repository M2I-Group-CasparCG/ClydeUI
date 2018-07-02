import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SwitchBar2dComponent } from './switch-bar-2d/switch-bar-2d.component';
import { HttpClientModule } from '@angular/common/http';  // prise en charge HTTP client pour api  calls
import { ApiCallService } from './api-call.service';
import { SocketIoService } from './socket-io.service';
import { IoConfigComponent } from './settings/io-config/io-config.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CasparSelectComponent } from './caspar-select/caspar-select.component';
import { SettingsComponent } from './settings/settings.component';
import { CasparsSettingsComponent } from './settings/caspars-settings/caspars-settings.component';
import { OutputMatrixComponent } from './output-matrix/output-matrix.component';
import { LivePageComponent } from './live-page/live-page.component';
import { MediaPlayerComponent } from './media-player/media-player.component';
import { ApiSettingsComponent } from './settings/api-settings/api-settings.component';
import { RecordsComponent } from './records/records.component';


@NgModule({
  declarations: [
    AppComponent,
    SwitchBar2dComponent,
    IoConfigComponent,
    CasparSelectComponent,
    SettingsComponent,
    CasparsSettingsComponent,
    OutputMatrixComponent,
    LivePageComponent,
    MediaPlayerComponent,
    ApiSettingsComponent,
    RecordsComponent,
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
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
