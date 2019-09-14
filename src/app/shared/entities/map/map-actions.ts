import { createAction, props} from '@ngrx/store';

import { Map } from '@app/types';
import { MapEntity } from './map-state';

export const MapActionKey = '[Map]';

export enum Events {
    FETCH_ALL_MAPS = '[Map] FETCH_ALL_MAPS',
    FETCH_ALL_MAPS_SUCCESS = '[Map] FETCH_ALL_MAPS_SUCCESS',
    SELECT_MAP = '[Map] SELECT_MAP',
}

export const fetchAllMaps = createAction(
    `${MapActionKey} FETCH_ALL_MAPS`
);

export const fetchAllMapsSuccess = createAction(
    `${MapActionKey} FETCH_ALL_MAPS_SUCCESS`,
    props<{maps: Map[]}>()
);

export const selectMap = createAction(
    `${MapActionKey} SELECT_MAP`,
    props<{mapId: string}>()
);
