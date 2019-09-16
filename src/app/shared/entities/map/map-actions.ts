import { createAction, props} from '@ngrx/store';

import { Map } from '@app/types';

import { MapEntity } from './map-state';

export const MapActionKey = '[Map]';

export const fetchAllMaps = createAction(
    `${MapActionKey} FETCH_ALL_MAPS`
);

export const fetchAllMapsSuccess = createAction(
    `${MapActionKey} FETCH_ALL_MAPS_SUCCESS`,
    props<{maps: Map[]}>()
);

export const selectMap = createAction(
    `${MapActionKey} SELECT_MAP`,
    props<{map: MapEntity}>()
);
