import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { SwitchBar2dComponent } from './switch-bar-2d/switch-bar-2d.component';

//
import { HttpClientModule } from '@angular/common/http';  // prise en charge HTTP client pour api  calls
import { ApiCallService } from './api-call.service';
import { SocketIoService } from './socket-io.service';
import { IoConfigComponent } from './io-config/io-config.component';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CasparAddComponent } from './caspar-add/caspar-add.component';
import { CasparsListComponent } from './caspars-list/caspars-list.component';
import { CasparSelectComponent } from './caspar-select/caspar-select.component';

@NgModule({
  declarations: [
    AppComponent,
    SwitchBar2dComponent,
    IoConfigComponent,
    CasparAddComponent,
    CasparsListComponent,
    CasparSelectComponent
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
    SocketIoService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
