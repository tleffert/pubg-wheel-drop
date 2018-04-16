import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { Angular2FontawesomeModule } from 'angular2-fontawesome/angular2-fontawesome'
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';

import { AlertModule } from 'ngx-bootstrap';

import { AppComponent } from './app.component';
import { WheelComponent } from './wheel/wheel.component';
import { LocationApiService } from '../services/location-api.service';
import { StreamService } from '../services/streamService.service';

import { LocationSelectModule } from './location-selection/location-select.module';
import { NavComponent } from './nav/nav.component';
import { EventService } from '../services/eventService.service';

@NgModule({
  declarations: [
    AppComponent,
    WheelComponent,
    NavComponent
  ],
  imports: [
    BrowserModule,
    AlertModule.forRoot(),
    Angular2FontawesomeModule,
    HttpClientModule,
    CommonModule,
    LocationSelectModule
  ],
  providers: [LocationApiService, EventService, StreamService],
  bootstrap: [AppComponent]
})
export class AppModule { }
