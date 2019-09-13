import { Injectable } from '@angular/core';

import { Store } from '@ngrx/store';
import { Actions, Effect, ofType} from '@ngrx/effects';
import { map, tap, switchMap, withLatestFrom } from 'rxjs/operators';
import { EMPTY } from 'rxjs'

import { LocationApiService } from '@app/api';
import * as LocationActions from './location-actions';

@Injectable()
export class LocationEffects {
    constructor(
        private actionStream$: Actions,
        private locationApi: LocationApiService,
        private store$: Store<any>
    ) {}


    @Effect()
    fetchMaps$ = this.actionStream$.pipe(
        ofType(LocationActions.fetchAllLocationsByMap),
        withLatestFrom(this.store$),
        switchMap(([{map}, store]) => {
            // TODO: Invalidate cached state
            if (!store.locations.lastFetched) {
                return this.locationApi.getMapLocations(map.name);
            } else {
                return EMPTY
            }
        }),
        map(locations => {
            return LocationActions.fetchAllLocationsByMapSuccess({locations: locations});
        })

    )
}
