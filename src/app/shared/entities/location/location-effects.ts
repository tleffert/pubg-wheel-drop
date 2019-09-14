import { Injectable } from '@angular/core';

import { Store } from '@ngrx/store';
import { Actions, Effect, ofType} from '@ngrx/effects';
import { map, tap, switchMap, take } from 'rxjs/operators';
import { iif, of } from 'rxjs';

import { LocationApiService } from '@app/api';
import * as LocationActions from './location-actions';
import { getLocationsByMap } from './location-selectors';

@Injectable()
export class LocationEffects {
    constructor(
        private actionStream$: Actions,
        private locationApi: LocationApiService,
        private store: Store<any>
    ) {}


    @Effect()
    fetchMaps$ = this.actionStream$.pipe(
        ofType(LocationActions.fetchAllLocationsByMap),
        switchMap(({map}) => {
            // First check the store for locations
            return this.store.select(getLocationsByMap(map.name))
            .pipe(
                switchMap(locations => {
                    return iif(
                        () => locations.length > 0,
                        // If th store returned locations use those
                        of(locations),
                        // Else get locations from the api
                        this.locationApi.getMapLocations(map.name)
                    );
                }),
                take(1)
            )
        }),
        map(locations => {
            return LocationActions.fetchAllLocationsByMapSuccess({locations: locations});
        })
    )
}
