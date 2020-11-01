import { createReducer, on, Action } from '@ngrx/store';

import { MapEntity, MapEntityCollectionState, mapEntityCollectioninitialState, mapEntityAdapter} from './map-state';
import  { MapActions } from './map-actions';



export function mapEntityCollectionReducer(state: MapEntityCollectionState | undefined, action: Action) {
    return reducer(state, action);
}

export const reducer = createReducer(
    mapEntityCollectioninitialState,

    on(
        MapActions.selectMap,
        (state, {map}) => {
            return {...state, selectedMapId: map._id};
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
            let updatedState = mapEntityAdapter.upsertMany(<MapEntity[]>maps, {...state});
            updatedState.fetching = false;
            return updatedState;
        }
    )
);
