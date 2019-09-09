import { createReducer, on, Action, Store } from '@ngrx/store';

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
            const updatedState = locationEntityAdapter.updateOne({
                id: location._id,
                changes: {
                    selected: true
                }
            }, state);
            const map = localStorage.getItem('map')
            localStorage.setItem(`${map}-locations`, JSON.stringify(updatedState))
            return updatedState
        }
    ),

    on(
        LocationActions.deselectLocation,
        (state, data) => {
            const { location } = data
            console.log(state, data)
            const updatedState = locationEntityAdapter.updateOne({
                id: location._id,
                changes: {
                    selected: false
                }
            }, state);
            const map = localStorage.getItem('map')
            localStorage.setItem(`${map}-locations`, JSON.stringify(updatedState))
            return updatedState 
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
            const map = localStorage.getItem('map')
            const storageLocations = JSON.parse(localStorage.getItem(`${map}-locations`))
            if (storageLocations) {
                updatedState = storageLocations
            }
            updatedState.fetching = false;
            return updatedState;
        }
    ),

    on(
        LocationActions.selectManyLocations,
        (state, {locations, toggleValue}) => {
            let updates = [];
            locations.forEach(location => {
                updates.push({
                    id: location._id,
                    changes: {
                        selected: toggleValue
                    }
                });
            });
            const updatedState = locationEntityAdapter.updateMany(updates, state);
            const map = localStorage.getItem('map')
            localStorage.setItem(`${map}-locations`, JSON.stringify(updatedState))
            return updatedState
        }
    )

);
