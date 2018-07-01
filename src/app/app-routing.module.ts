import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SettingsComponent } from './settings/settings.component';
import { SwitchBar2dComponent } from './switch-bar-2d/switch-bar-2d.component';
import { OutputMatrixComponent } from './output-matrix/output-matrix.component';
import { LivePageComponent } from './live-page/live-page.component';
import { MediaPlayerComponent } from './media-player/media-player.component';
import { IoConfigComponent } from './settings/caspars-settings/io-config/io-config.component';
import { CasparsSettingsComponent } from './settings/caspars-settings/caspars-settings.component';
import { ApiSettingsComponent } from './settings/api-settings/api-settings.component';

const routes: Routes = [
  { path: 'settings', component: SettingsComponent },
  { path: 'switchbar', component: SwitchBar2dComponent },
  { path: 'outputmatrix', component: OutputMatrixComponent },
  { path: 'live', component : LivePageComponent},
  { path: 'mediaplayer', component : MediaPlayerComponent},
  { path: 'io-settings', component : IoConfigComponent },
  { path: 'caspars-settings', component : CasparsSettingsComponent },
  { path: 'api-settings', component : ApiSettingsComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }
