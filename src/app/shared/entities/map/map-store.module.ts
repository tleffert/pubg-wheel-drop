import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { StoreModule, MetaReducer } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

import { MapEffects } from './map-effects';
import { mapEntityCollectionReducer } from './map-reducer';
import { MapActions } from './map-actions';

import { hydrateState, storeStateSlice } from '../../services/localStorageMetaReducers';

export const metaReducers: MetaReducer<any>[] = []//[storeStateSlice(MapActions.ActionKey), hydrateState(MapActions.ActionKey)];

@NgModule({
    imports: [
        CommonModule,
        StoreModule.forFeature('maps', mapEntityCollectionReducer, { metaReducers }),
        EffectsModule.forFeature([MapEffects])
    ],
    providers: []
})
export class MapStoreModule{}
