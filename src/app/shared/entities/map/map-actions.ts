import { createAction, props} from '@ngrx/store';

import { Map } from '@app/types';
import { MapEntity } from './map-state';

export enum Events {
    FETCH_ALL_MAPS = '[Map] FETCH_ALL_MAPS',
    FETCH_ALL_MAPS_SUCCESS = '[Map] FETCH_ALL_MAPS_SUCCESS',
    SELECT_MAP = '[Map] SELECT_MAP',
}

export const fetchAllMaps = createAction(
    Events.FETCH_ALL_MAPS
);

export const fetchAllMapsSuccess = createAction(
    Events.FETCH_ALL_MAPS_SUCCESS,
    props<{maps: Map[]}>()
);

export const selectMap = createAction(
    Events.SELECT_MAP,
    props<{mapId: string}>()
);
