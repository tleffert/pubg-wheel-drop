import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { Angular2FontawesomeModule } from 'angular2-fontawesome/angular2-fontawesome'

import { AlertModule } from 'ngx-bootstrap';

import { AppComponent } from './app.component';
import { WheelComponent } from './wheel/wheel.component';


@NgModule({
  declarations: [
    AppComponent,
    WheelComponent
  ],
  imports: [
    BrowserModule,
    AlertModule.forRoot(),
    Angular2FontawesomeModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
