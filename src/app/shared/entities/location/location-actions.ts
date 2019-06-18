import { createAction, props} from '@ngrx/store';

import { Location } from '@app/types';
import { LocationEntity } from './location-state';
import { MapEntity } from '../map/map-state';

export enum Events {
    SELECT_ONE_LOCATION = '[Location] SELECT_ONE_LOCATION',
    DESELECT_LOCATION = '[Location] DESELECT_LOCATION',
    SELECT_MANY_LOCATIONS = '[Location] SELECT_MANY_LOCATIONS',
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
    Events.SELECT_ONE_LOCATION,
    props<{location: LocationEntity}>()
);

export const selectManyLocations = createAction(
    Events.SELECT_MANY_LOCATIONS,
    props<{locations: LocationEntity[], toggleValue: boolean}>()
)
