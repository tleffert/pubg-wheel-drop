import { createReducer, on, Action } from '@ngrx/store';

import { LocationEntity, LocationEntityCollectionState, locationEntityAdapter, locationEntityCollectioninitialState } from './location-state';
import * as LocationActions from './location-actions';



export function locationEntityCollectionReducer(state: LocationEntityCollectionState | undefined, action: Action) {
    return reducer(state, action);
}

export const reducer = createReducer(
    locationEntityCollectioninitialState,

    on(
        LocationActions.selectLocation,
        (state, {location}) => {
            return locationEntityAdapter.updateOne({
                id: location._id,
                changes: {
                    selected: true
                }
            }, state);
        }
    ),

    on(
        LocationActions.deselectLocation,
        (state, {location}) => {
            return locationEntityAdapter.updateOne({
                id: location._id,
                changes: {
                    selected: false
                }
            }, state);
        }
    ),

    on(
        LocationActions.fetchAllLocationsByMap,
        (state) => {
            let updatedState = {...state};
            updatedState.fetching = true;
            return updatedState;
        }
    ),

    on(
        LocationActions.fetchAllLocationsByMapSuccess,
        (state, {locations}) => {
            let updatedState = locationEntityAdapter.upsertMany(<LocationEntity[]>locations, state);
            updatedState.fetching = false;
            return updatedState;
        }
    )

);
