import { createEntityAdapter, EntityState, EntityAdapter } from '@ngrx/entity';

import { Location } from '@app/types';

export interface LocationEntity extends Location {
    selected: boolean;
}

export interface LocationEntityCollectionState extends EntityState<LocationEntity> {
    fetching: boolean;
    lastFetched: number;
}

// Registering how the entity adapter will compare each Entity by some 'id'
export const locationEntityAdapter = createEntityAdapter<LocationEntity>({
    selectId: (location: LocationEntity) => location._id
});

export const locationEntityCollectioninitialState: LocationEntityCollectionState = locationEntityAdapter.getInitialState({
    fetching: false,
    lastFetched: null 
});
