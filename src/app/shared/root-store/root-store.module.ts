import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';

import { MapStoreModule } from '../entities/map/map-store.module';
import { LocationStoreModule } from '../entities/location/location-store.module';
import { WheelStoreModule } from '../entities/wheel/wheel-store.module';

@NgModule({
    imports: [
        CommonModule,
        MapStoreModule,
        LocationStoreModule,
        WheelStoreModule,
        StoreModule.forRoot({}, {}),
        EffectsModule.forRoot([]),
        StoreDevtoolsModule.instrument({
            maxAge: 25
        })
    ],
})
export class RootStoreModule{}
