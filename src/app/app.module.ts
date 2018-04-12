import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { SwitchBar2dComponent } from './switch-bar-2d/switch-bar-2d.component';

//
import { HttpClientModule } from '@angular/common/http';  // prise en charge HTTP client pour api  calls
import { ApiCallService } from './api-call.service';
import { SocketIoService } from './socket-io.service';

@NgModule({
  declarations: [
    AppComponent,
    SwitchBar2dComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [
    ApiCallService,
    SocketIoService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
