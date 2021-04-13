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
            return {...state, fetching: true};
        }
    ),

    on(
        LocationActions.fetchAllLocationsByMapSuccess,
        LocationActions.initDefaultMapLocations,
        (state, {locations}) => {
            let updatedState = {...state, fetching: false};
            return locationEntityAdapter.upsertMany(<LocationEntity[]>locations, updatedState);
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
            return locationEntityAdapter.updateMany(updates, state);
        }
    ),

    on(
        LocationActions.toggleSpiceGroup,
        (state, {spiceLevel, map}) => {
            let updateIds = [];
            let normalizedSelect = true;

            state.ids.forEach(id => {
                if (state.entities[id].map === map.name && state.entities[id].level == spiceLevel) {
                    // finding the ids/entities that we will want to update
                    updateIds.push(id);
                    /*
                        Getting a normalized value on how to toggle the group
                        This gets us a 'default' selecting all if only a subset of the group is selected
                    */
                    normalizedSelect = normalizedSelect && state.entities[id].selected;
                }
            });

            const updates = updateIds.map(id => {
                return {
                    id: id,
                    changes: {
                        selected: !normalizedSelect
                    }
                }
            });

            return locationEntityAdapter.updateMany(updates, state);
        }
    )

);
