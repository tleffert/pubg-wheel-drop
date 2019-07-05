import { createFeatureSelector, createSelector} from '@ngrx/store';
import { LocationEntityCollectionState, locationEntityAdapter } from './location-state';

// Selects the Map collection slice from the store
export const selectLocationEntityState = createFeatureSelector<LocationEntityCollectionState>('locations');

/** Alias for selectAll (selectAllLocations) provided with EntityAdapters */
export const {selectAll: selectAllLocations, selectIds } = locationEntityAdapter.getSelectors(
    selectLocationEntityState
);

/**
 * Selector to fetch locations by specified map
 * @param  mapName Name of map for desired locations
 * @return LocationEntity[]
 */
export const getLocationsByMap = (mapName: string) => createSelector(
    selectAllLocations,
    (locations) => {
        return locations.filter(location => {
            return location.map === mapName;
        });
    }
);

/**
 * Selector to fetch selected locations by specified map
 * @param  mapName Name of map for desired selected locations
 * @return LocationEntity[]
 */
export const getSelectedLocationsByMap = (mapName: string ) => createSelector(
    selectAllLocations,
    (locations) => {
        return locations.filter(location => {
            return location.map === mapName && location.selected;
        })
    }

)
