import { createAction, props} from '@ngrx/store';

import { Location, Map } from '@app/types';
import { LocationEntity } from './location-state';
import { MapEntity } from '../map/map-state';

export const LocationActionKey = '[Location]';

export const fetchAllLocationsByMap = createAction(
    `${LocationActionKey} FETCH_ALL_LOCATIONS_BY_MAP`,
    props<{map: MapEntity}>()
);

export const fetchAllLocationsByMapSuccess = createAction(
    `${LocationActionKey} FETCH_ALL_LOCATIONS_BY_MAP_SUCCESS`,
    props<{locations: Location[]}>()
);

export const deselectLocation = createAction(
    `${LocationActionKey} DESELECT_ONE_LOCATION`,
    props<{location: LocationEntity}>()
);

export const selectLocation = createAction(
    `${LocationActionKey} SELECT_ONE_LOCATION`,
    props<{location: LocationEntity}>()
);

export const selectManyLocations = createAction(
    `${LocationActionKey} SELECT_MANY_LOCATIONS`,
    props<{locations: LocationEntity[], toggleValue: boolean}>()
);

export const initDefaultMapLocations = createAction(
    `${LocationActionKey} INIT_DEFAULT_MAP_LOCATIONS`,
    props<{map: Map, locations: Location[]}>()
);
