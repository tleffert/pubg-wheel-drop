import { Injectable } from '@angular/core';

import { Actions, Effect, ofType} from '@ngrx/effects';
import { map, tap, switchMap} from 'rxjs/operators';

import { LocationApiService } from '@app/api';
import { MapActions, MapEntity } from '@app/store';

@Injectable()
export class MapEffects {
    constructor(
        private actionStream$: Actions,
        private locationApi: LocationApiService
    ) {}


    @Effect()
    fetchMaps$ = this.actionStream$.pipe(
        ofType(MapActions.fetchAllMaps),
        switchMap(() => {
            return this.locationApi.getMaps();
        }),
        map(maps => {
            return MapActions.fetchAllMapsSuccess({maps: <MapEntity[]>maps});
        })

    )
}
