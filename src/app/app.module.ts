import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { Angular2FontawesomeModule } from 'angular2-fontawesome/angular2-fontawesome'
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';

import { SharedModule } from './shared/shared.module';

import { AlertModule } from 'ngx-bootstrap';

import { AppComponent } from './app.component';
import { WheelComponent } from './wheel/wheel.component';

import { LocationSelectModule } from './location-selection/location-select.module';
import { NavComponent } from './nav/nav.component';
import { EventService } from './shared/services/eventService.service';
import { SteamStatusComponent } from './steam-status/steam-status.component';
import { MapSelectComponent } from './map-select/map-select.component';

@NgModule({
  declarations: [
    AppComponent,
    WheelComponent,
    NavComponent,
    SteamStatusComponent,
    MapSelectComponent
  ],
  imports: [
    BrowserModule,
    AlertModule.forRoot(),
    Angular2FontawesomeModule,
    HttpClientModule,
    CommonModule,
    SharedModule,
    LocationSelectModule
  ],
  providers: [EventService],
  bootstrap: [AppComponent]
})
export class AppModule { }
