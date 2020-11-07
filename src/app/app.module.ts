import { BrowserModule } from '@angular/platform-browser';
import { APP_INITIALIZER, NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { OverlayModule, OVERLAY_PROVIDERS } from '@angular/cdk/overlay';


import { SharedModule } from './shared/shared.module';
import { AppRoutingModule } from './app-routing.module';

import { AlertModule } from 'ngx-bootstrap';

import { AppComponent } from './app.component';
import { WheelComponent } from './wheel/wheel.component';

import { LocationSelectModule } from './location-selection/location-select.module';
import { NavComponent } from './nav/nav.component';
import { EventService } from './shared/services/eventService.service';
import { SteamStatusComponent } from './steam-status/steam-status.component';
import { MapSelectComponent } from './map-select/map-select.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { WinnerAnnounceComponent } from './winner-announce/winner-announce.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { LocationApiService } from './shared/api/location-api.service';
import { Store } from '@ngrx/store';
import { MapActions } from './shared/entities/map/map-actions';
import { switchMap, tap } from 'rxjs/operators';
import { LocationActions } from '@app/store';

@NgModule({
  declarations: [
    AppComponent,
    WheelComponent,
    NavComponent,
    SteamStatusComponent,
    MapSelectComponent,
    WinnerAnnounceComponent
  ],
  imports: [
    BrowserModule,
    AlertModule.forRoot(),
    // Angular2FontawesomeModule,
    HttpClientModule,
    CommonModule,
    SharedModule,
    LocationSelectModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    OverlayModule,
    FontAwesomeModule
  ],
  providers: [
      EventService,
      OVERLAY_PROVIDERS,
      {
        provide: APP_INITIALIZER,
        useFactory: (locationApi: LocationApiService, store: Store<any>) => {
            return () => locationApi.getMaps().pipe(
                 tap(maps => {
                     store.dispatch(MapActions.initMaps({
                         maps: maps
                     }));
                 }),
                 switchMap(maps => {
                     let defaultMap = maps.find(map => map.default);
                     return locationApi.getMapLocations(defaultMap.name);
                 }),
                 tap(locations => {
                     store.dispatch(LocationActions.fetchAllLocationsByMapSuccess({
                         locations: locations
                     }));
                 })
            ).toPromise();
        },
        deps: [LocationApiService, Store],
        multi: true
    }
  ],
  bootstrap: [AppComponent],
  entryComponents: [WinnerAnnounceComponent]
})
export class AppModule { }
