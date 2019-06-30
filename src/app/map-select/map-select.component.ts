import { Component, OnInit } from '@angular/core';
import { map, tap, take, takeWhile, filter } from 'rxjs/operators';

import { Store } from '@ngrx/store';

import { LocationApiService } from '@app/api';
import { Map } from '@app/types';
import { MapSelectors, MapEntity, MapActions, LocationActions, selectWheelState } from '@app/store';

@Component({
  selector: 'app-map-select',
  templateUrl: './map-select.component.html',
  styleUrls: ['./map-select.component.css']
})
export class MapSelectComponent implements OnInit {

    maps : Array<any>;
    selectedMap : MapEntity;
    disableOptionSelect: boolean;

    private cleanup: boolean;

    constructor(
        private store: Store<any>
    ) {
        // Force fetch from API (probably move this somewhere else)
        this.store.dispatch(MapActions.fetchAllMaps());

        this.store.select(MapSelectors.selectAllMaps)
        .pipe(
            tap(maps => {
                this.maps = maps;
            }),
            takeWhile(() => !this.cleanup)
        ).subscribe();

        // Updater for selected map updates
        this.store.select(MapSelectors.getSelectedMap)
        .pipe(
            filter(selectedMap => !!selectedMap),
            tap(selectedMap => {
                this.selectedMap = selectedMap;
                this.store.dispatch(LocationActions.fetchAllLocationsByMap({map: selectedMap}));
            }),
            takeWhile(() => !this.cleanup)
        ).subscribe();

    }

    ngOnInit() {
        // Listener to check on the state of the wheel.
        this.store.select(selectWheelState)
        .pipe(
            tap(wheelState => {
                // Using this to know when to disable buttons
                this.disableOptionSelect = wheelState.spinning;
            })
        ).subscribe();

    }


    selectMap(map: MapEntity) {
        this.store.dispatch(MapActions.selectMap({mapId: map._id}));
    }


}
