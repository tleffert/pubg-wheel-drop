import { createEntityAdapter, EntityState, EntityAdapter } from '@ngrx/entity';

import { Map } from '@app/types';

export interface MapEntity extends Map {
    selected: boolean;
}

export interface MapEntityCollectionState extends EntityState<MapEntity> {
    selectedMap: MapEntity;
    fetching: boolean;
}

// Registering how the entity adapter will compare each Entity by some 'id'
export const mapEntityAdapter = createEntityAdapter<MapEntity>({
    selectId: (map: MapEntity) => map._id
});

export const mapEntityCollectioninitialState: MapEntityCollectionState = mapEntityAdapter.getInitialState({
    selectedMap: null,
    fetching: false
});
