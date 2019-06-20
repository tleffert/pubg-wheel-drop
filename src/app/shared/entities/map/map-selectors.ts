import { createFeatureSelector, createSelector} from '@ngrx/store';
import { MapEntityCollectionState, mapEntityAdapter} from './map-state';

// Selects the Map collection slice from the store
export const selectMapEntityState = () => createFeatureSelector<MapEntityCollectionState>('maps');

// Some magic setting up alias for selecting all Maps from the store
export const {selectAll: selectAllMaps, selectIds } = mapEntityAdapter.getSelectors(
    selectMapEntityState()
);

// Selector that will return the currently selected map
export const getSelectedMap = () => createSelector(
    selectMapEntityState(),
    (state) => {
        return state.selectedMap;
    }
);
