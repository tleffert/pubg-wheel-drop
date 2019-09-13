import { Injectable } from '@angular/core';

import { Store } from '@ngrx/store';
import { Actions, Effect, ofType} from '@ngrx/effects';
import { map, tap, switchMap, withLatestFrom} from 'rxjs/operators';
import { EMPTY } from 'rxjs';

import { LocationApiService } from '@app/api';
import { MapActions, MapEntity } from '@app/store';

@Injectable()
export class MapEffects {
    constructor(
        private actionStream$: Actions,
        private locationApi: LocationApiService,
        private store$: Store<any>
    ) {}


    @Effect()
    fetchMaps$ = this.actionStream$.pipe(
        ofType(MapActions.fetchAllMaps),
        withLatestFrom(this.store$),
        switchMap(([action, store]) => {
            if (!store.maps.lastFetched) {
                return this.locationApi.getMaps();
            } else {
                return EMPTY
            }
        }),
        map(maps => {
            return MapActions.fetchAllMapsSuccess({maps: <MapEntity[]>maps});
        })

    )
}
