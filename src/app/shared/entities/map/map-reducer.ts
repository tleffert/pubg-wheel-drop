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
                // First unselect all maps
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
