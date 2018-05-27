import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SettingsComponent } from './settings/settings.component';
import { SwitchBar2dComponent } from './switch-bar-2d/switch-bar-2d.component';
import { OutputMatrixComponent } from './output-matrix/output-matrix.component';
import { LivePageComponent } from './live-page/live-page.component';

const routes: Routes = [
  { path: 'settings', component: SettingsComponent },
  { path: 'switchbar', component: SwitchBar2dComponent },
  { path: 'outputmatrix', component: OutputMatrixComponent },
  { path: 'live', component : LivePageComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }
