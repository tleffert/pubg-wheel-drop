import { Injectable } from '@angular/core';

import { Actions, Effect, ofType} from '@ngrx/effects';
import { map, tap, switchMap} from 'rxjs/operators';

import { LocationApiService } from '@app/api';
import * as LocationActions from './location-actions';

@Injectable()
export class LocationEffects {
    constructor(
        private actionStream$: Actions,
        private locationApi: LocationApiService
    ) {}


    @Effect()
    fetchMaps$ = this.actionStream$.pipe(
        ofType(LocationActions.fetchAllLocationsByMap),
        switchMap(({map}) => {
            return this.locationApi.getMapLocations(map.name);
        }),
        map(locations => {
            return LocationActions.fetchAllLocationsByMapSuccess({locations: locations});
        })

    )
}
