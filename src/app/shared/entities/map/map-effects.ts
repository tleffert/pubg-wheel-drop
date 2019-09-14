import { Injectable } from '@angular/core';

import { Store } from '@ngrx/store';
import { Actions, Effect, ofType} from '@ngrx/effects';
import { iif, of } from 'rxjs';
import { map, switchMap, take} from 'rxjs/operators';

import { LocationApiService } from '@app/api';
import { MapActions, MapEntity } from '@app/store';
import { selectAllMaps } from './map-selectors';

@Injectable()
export class MapEffects {
    constructor(
        private actionStream$: Actions,
        private locationApi: LocationApiService,
        private store: Store<any>
    ) {}


    @Effect()
    fetchMaps$ = this.actionStream$.pipe(
        ofType(MapActions.fetchAllMaps),
        switchMap(() => {
            // First check the store for locations
            return this.store.select(selectAllMaps)
            .pipe(
                switchMap(maps => {
                    return iif(
                        () => maps.length > 0,
                        // If the store has maps, use those`
                        of(maps),
                        // Else get maps from the api
                        this.locationApi.getMaps()
                    );
                }),
                take(1)
            )
        }),
        map(maps => {
            return MapActions.fetchAllMapsSuccess({maps: <MapEntity[]>maps});
        })

    )
}
