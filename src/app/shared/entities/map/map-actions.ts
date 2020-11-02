import { createAction, props} from '@ngrx/store';

import { Map } from '@app/types';

import { MapEntity } from './map-state';

export namespace MapActions {
    export const ActionKey = '[Map]';

    export const fetchAllMaps = createAction(
        `${ActionKey} FETCH_ALL_MAPS`
    );

    export const fetchAllMapsSuccess = createAction(
        `${ActionKey} FETCH_ALL_MAPS_SUCCESS`,
        props<{maps: Map[]}>()
    );

    export const selectMap = createAction(
        `${ActionKey} SELECT_MAP`,
        props<{map: MapEntity}>()
    );

    export const initMaps = createAction(
        `${ActionKey} INIT_MAPS`,
        props<{maps: Map[]}>()
    );

}
