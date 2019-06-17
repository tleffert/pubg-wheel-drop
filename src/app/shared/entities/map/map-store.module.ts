import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { MapEffects } from './map-effects';
import { mapEntityCollectionReducer } from './map-reducer';

@NgModule({
    imports: [
        CommonModule,
        StoreModule.forFeature('maps', mapEntityCollectionReducer),
        EffectsModule.forFeature([MapEffects])
    ],
    providers: []
})
export class MapStoreModule{}
