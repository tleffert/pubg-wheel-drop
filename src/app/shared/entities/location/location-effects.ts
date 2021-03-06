import { Injectable } from '@angular/core';

import { Store } from '@ngrx/store';
import { Actions, Effect, ofType} from '@ngrx/effects';
import { map, tap, switchMap, take } from 'rxjs/operators';
import { iif, of } from 'rxjs';

import { LocationApiService } from '@app/api';
import * as LocationActions from './location-actions';
import { MapActions } from '../map/map-actions';
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
        ofType(
            LocationActions.fetchAllLocationsByMap,
            MapActions.selectMap
        ),
        switchMap(({map}) => {
            // First check the store for locations
            return this.store.select(getLocationsByMap, {map: map})
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
    );

    @Effect()
    initDefaultMapLocations$ = this.actionStream$.pipe(
        ofType(MapActions.initMaps),
        switchMap(({maps}) => {
            let defaultMap = maps.find(map => map.default);

            return this.locationApi.getMapLocations(defaultMap.name).pipe(
                map(locations => {
                    return LocationActions.initDefaultMapLocations({
                        map: defaultMap,
                        locations: locations
                    })
                })
            );
        })
    );
}
