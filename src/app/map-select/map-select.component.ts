import { Component, OnInit } from '@angular/core';
import { map, tap, take, takeWhile } from 'rxjs/operators';

import { Store } from '@ngrx/store';

import { LocationApiService } from '@app/api';
import { Map } from '@app/types';
import { MapSelectors, MapEntity, MapActions } from '@app/store';

@Component({
  selector: 'app-map-select',
  templateUrl: './map-select.component.html',
  styleUrls: ['./map-select.component.css']
})
export class MapSelectComponent implements OnInit {

    maps : Array<any>;
    selectedMap : MapEntity;

    private cleanup: boolean;

    constructor(
        private store: Store<any>,
        private locationApi: LocationApiService
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
        this.store.select(MapSelectors.getSelectedMap())
        .pipe(
            tap(selectedMap => {
                this.selectedMap = selectedMap;
            }),
            takeWhile(() => !this.cleanup)
        ).subscribe();

    }

    ngOnInit() {

    }


    selectMap(map: MapEntity) {
        // this.selectedMap = map;
        // this.selectedMap.selected = true;
        console.log("YOU SELECTED THIS MAP", map);
        this.store.dispatch(MapActions.selectMap({map: map}));
    }


}
