import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { WheelComponent } from './wheel/wheel.component';
import { MapsResolver } from './shared/resolvers/maps.resolver';

const routes: Routes = [
    {
        path: '',
        component: WheelComponent,
        resolve: {maps: MapsResolver}
    }
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
