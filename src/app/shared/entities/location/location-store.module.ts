import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { StoreModule, MetaReducer } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';


import { LocationEffects } from './location-effects';
import { locationEntityCollectionReducer } from './location-reducer';
import { LocationActionKey } from './location-actions';

import { hydrateState, storeStateSlice } from '../../services/localStorageMetaReducers';

export const metaReducers: MetaReducer<any>[] = []//[storeStateSlice(LocationActionKey), hydrateState(LocationActionKey)];

@NgModule({
    imports: [
        CommonModule,
        StoreModule.forFeature('locations', locationEntityCollectionReducer, { metaReducers }),
        EffectsModule.forFeature([LocationEffects])
    ],
    providers: []
})
export class LocationStoreModule{}
