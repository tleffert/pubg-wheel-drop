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
        (state, {mapId}) => {
            let updatedState = {...state};
            if(state.selectedMap) {
                // First make sure the previously selected map is deselected
                updatedState = mapEntityAdapter.updateOne({
                    id: state.selectedMap,
                    changes: {
                        selected: false
                    }
                }, state);
            }

            // Update the specific map is now selected
            updatedState = mapEntityAdapter.updateOne({
                id: mapId,
                changes: {
                    selected: true
                }
            }, updatedState);

            // Update overall collection state on the selected map
            updatedState.selectedMap = mapId;
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
            updatedState.fetching = false;
            return updatedState;
        }
    )
);
