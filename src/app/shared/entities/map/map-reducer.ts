import { createReducer, on, Action } from '@ngrx/store';

import { MapEntity, MapEntityCollectionState, mapEntityCollectioninitialState, mapEntityAdapter} from './map-state';
import * as MapActions from './map-actions';



export function mapEntityCollectionReducer(state: MapEntityCollectionState | undefined, action: Action) {
    return reducer(state, action);
}

export const reducer = createReducer(
    mapEntityCollectioninitialState,

    on(
        MapActions.selectMap,
        (state, {map}) => {
            let updatedState = {...state};
            if(state.selectedMap) {
                // First make sure the previously selected map is deselected
                updatedState = mapEntityAdapter.updateOne({
                    id: state.selectedMap._id,
                    changes: {
                        selected: false
                    }
                }, state);
            }

            // Update the specific map is now selected
            updatedState = mapEntityAdapter.updateOne({
                id: map._id,
                changes: {
                    selected: true
                }
            }, updatedState);

            // Update overall collection state on the selected map
            updatedState.selectedMap = map;
            // Store selected map locally
            localStorage.setItem('map', map._id)
            return updatedState;
        }
    ),

    on(
        MapActions.fetchAllMaps,
        (state) => {
            let updatedState = {...state};
            updatedState.fetching = true;
            return updatedState;
        }
    ),

    on(
        MapActions.fetchAllMapsSuccess,
        (state, {maps}) => {
            let updatedState = mapEntityAdapter.upsertMany(<MapEntity[]>maps, state);
            // Get storeded locally map
            const storageMap = localStorage.getItem('map')
            if (storageMap) {
                // Find map object from stored map id
                const selectedMap = <MapEntity> maps.find(map => map._id === storageMap)
                // Set map object to selected
                selectedMap.selected = true
                // Updated selected map
                updatedState.selectedMap = selectedMap
            }
            updatedState.fetching = false;
            return updatedState;
        }
    )
);
