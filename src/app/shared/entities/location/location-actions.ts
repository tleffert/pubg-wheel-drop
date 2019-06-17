import { createAction, props} from '@ngrx/store';

import { Location } from '@app/types';
import { LocationEntity } from './location-state';
import { MapEntity } from '../map/map-state';

export enum Events {
    SELECT_LOCATION = '[Location] SELECT_LOCATION',
    DESELECT_LOCATION = '[Location] DESELECT_LOCATION',
    FETCH_ALL_LOCATIONS_BY_MAP = '[Location] FETCH_ALL_LOCATIONS_BY_MAP',
    FETCH_ALL_LOCATIONS_BY_MAP_SUCCESS = '[Location] FETCH_ALL_LOCATIONS_BY_MAP_SUCCESS'
}

export const fetchAllLocationsByMap = createAction(
    Events.FETCH_ALL_LOCATIONS_BY_MAP,
    props<{map: MapEntity}>()
);

export const fetchAllLocationsByMapSuccess = createAction(
    Events.FETCH_ALL_LOCATIONS_BY_MAP_SUCCESS,
    props<{locations: Location[]}>()
);

export const deselectLocation = createAction(
    Events.DESELECT_LOCATION,
    props<{location: LocationEntity}>()
);

export const selectLocation = createAction(
    Events.SELECT_LOCATION,
    props<{location: LocationEntity}>()
);
