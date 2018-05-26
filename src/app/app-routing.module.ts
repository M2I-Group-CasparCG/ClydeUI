import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SettingsComponent } from './settings/settings.component';
import { SwitchBar2dComponent } from './switch-bar-2d/switch-bar-2d.component';

const routes: Routes = [
  { path: 'settings', component: SettingsComponent },
  { path: 'switchbar', component: SwitchBar2dComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }
