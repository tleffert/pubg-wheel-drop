import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { StoreModule, ActionReducer, MetaReducer } from '@ngrx/store';
import { EffectsModule, ROOT_EFFECTS_INIT } from '@ngrx/effects';

import { LocalStorageService } from '@app/localStorageService';

import { MapEffects } from './map-effects';
import { mapEntityCollectionReducer } from './map-reducer';
import { MapEntityCollectionState } from './map-state';
import { MapActionKey } from './map-actions';

import { hydrateState, storeStateSlice } from '../../services/localStorageMetaReducers';

export const metaReducers: MetaReducer<any>[] = [storeStateSlice(MapActionKey), hydrateState(MapActionKey)];

@NgModule({
    imports: [
        CommonModule,
        StoreModule.forFeature('maps', mapEntityCollectionReducer, { metaReducers }),
        EffectsModule.forFeature([MapEffects])
    ],
    providers: []
})
export class MapStoreModule{}
