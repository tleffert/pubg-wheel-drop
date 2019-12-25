import { createFeatureSelector, createSelector} from '@ngrx/store';
import { MapEntityCollectionState, mapEntityAdapter} from './map-state';

// Selects the Map collection slice from the store
export const selectMapEntityState = createFeatureSelector<MapEntityCollectionState>('maps');

// Some magic setting up alias for selecting all Maps from the store
export const {selectAll: selectAllMaps, selectIds } = mapEntityAdapter.getSelectors(
    selectMapEntityState
);

/**
 * Fetches currently selected MapEntity from the store
 * @return Observable that Provides values of currently selected map
 */
export const getSelectedMap = createSelector(
    selectMapEntityState,
    ({entities, selectedMapId}) => {
        return entities[selectedMapId];
    }
);
