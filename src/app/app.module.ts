import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { Angular2FontawesomeModule } from 'angular2-fontawesome/angular2-fontawesome'
import { HttpClientModule } from '@angular/common/http';

import { AlertModule } from 'ngx-bootstrap';

import { AppComponent } from './app.component';
import { WheelComponent } from './wheel/wheel.component';
import { LocationApiService } from './location-api.service'

@NgModule({
  declarations: [
    AppComponent,
    WheelComponent
  ],
  imports: [
    BrowserModule,
    AlertModule.forRoot(),
    Angular2FontawesomeModule,
    HttpClientModule
  ],
  providers: [LocationApiService],
  bootstrap: [AppComponent]
})
export class AppModule { }
