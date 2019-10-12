import { createFeatureSelector, createSelector} from '@ngrx/store';
import { LocationEntityCollectionState, locationEntityAdapter } from './location-state';
import { MapEntity } from '../map/map-state';
import { getSelectedMap } from '../map/map-selectors';

// Selects the Map collection slice from the store
export const selectLocationEntityState = () => createFeatureSelector<LocationEntityCollectionState>('locations');

// Some magic setting up alias for selecting all Maps from the store
export const {selectAll: selectAllLocations, selectIds } = locationEntityAdapter.getSelectors(
    selectLocationEntityState()
);

export const getLocationsByMap = (map: MapEntity) => createSelector(
    selectAllLocations,
    (locations) => {
        return locations.filter(location => {
            return location.map === map.name;
        });
    }
);

export const getSelectedMapLocations = createSelector(
    getSelectedMap,
    selectAllLocations,
    (map, locations) => {
        return locations.filter(location => {
            return location.map === map.name;
        });
    }
);
