import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SettingsComponent } from './settings/settings.component';
import { SwitchBar2dComponent } from './switch-bar-2d/switch-bar-2d.component';
import { SwitchBarComponent } from './switch-bar/switch-bar.component';
import { OutputMatrixComponent } from './output-matrix/output-matrix.component';
import { LivePageComponent } from './live-page/live-page.component';
import { MediaPlayerComponent } from './media-player/media-player.component';
import { IoConfigComponent } from './settings/io-config/io-config.component';
import { CasparsSettingsComponent } from './settings/caspars-settings/caspars-settings.component';
import { ApiSettingsComponent } from './settings/api-settings/api-settings.component';
import { RecordsComponent } from './records/records.component';
import { TestComponent } from './test/test.component';

const routes: Routes = [
  { path: 'settings', component: SettingsComponent },
  { path: 'switchbar2d', component: SwitchBar2dComponent },
  { path: 'switchbar', component: SwitchBarComponent },
  { path: 'outputmatrix', component: OutputMatrixComponent },
  { path: 'live', component : LivePageComponent},
  { path: 'mediaplayer', component : MediaPlayerComponent},
  { path: 'io-settings', component : IoConfigComponent },
  { path: 'caspars-settings', component : CasparsSettingsComponent },
  { path: 'api-settings', component : ApiSettingsComponent },
  { path: 'records', component : RecordsComponent },
  { path: 'test', component : TestComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }
