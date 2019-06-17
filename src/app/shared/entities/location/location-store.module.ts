import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { LocationEffects } from './location-effects';
import { locationEntityCollectionReducer } from './location-reducer';

@NgModule({
    imports: [
        CommonModule,
        StoreModule.forFeature('locations', locationEntityCollectionReducer),
        EffectsModule.forFeature([LocationEffects])
    ],
    providers: []
})
export class LocationStoreModule{}
