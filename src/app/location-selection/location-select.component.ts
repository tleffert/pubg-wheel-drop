import { Component, OnInit, NgModule, Input } from '@angular/core';

import { tap, takeWhile, switchMap, filter } from 'rxjs/operators';
import { Store } from '@ngrx/store';

import { LocationSelectors, LocationEntity, LocationActions, MapSelectors} from '@app/store';
import { LocationApiService } from '@app/api';
import { EventService } from '../shared/services/eventService.service';

@Component({
  selector: 'location-select',
  templateUrl: './location-select.component.html',
  styleUrls: ['./location-select.component.scss'],
})
export class LocationSelectComponent implements OnInit {

    @Input()
    map : string;

    mapLocationsBySpice: {[key: number]: {[key: string]: LocationEntity}};
    spiceToggle = {};

    spice1toggleAll: boolean;
    spice2toggleAll: boolean;
    spice3toggleAll: boolean;


    constructor(
        private store: Store<any>,
        private locationApi : LocationApiService,
        private eventService : EventService
    ) {

        // Need to keep an eye on the selected map to know what locations to show
        this.store.select(MapSelectors.getSelectedMap())
        .pipe(
            filter(selectedMap => !!selectedMap),
            switchMap(selectedMap => {
                return this.store.select(LocationSelectors.getLocationsByMap(selectedMap));
            }),
            tap(mapLocations => {
                // reset mapLocation Map
                this.mapLocationsBySpice = { 1:{}, 2:{}, 3:{}};
                mapLocations.forEach(location => {
                    this.mapLocationsBySpice[location.level][location._id] = location;
                });
            })
        ).subscribe()
    }

    ngOnInit() {
    }

    toggleOption(location : LocationEntity) : void {
        if(location.selected) {
            this.store.dispatch(LocationActions.deselectLocation({location: location}));
        } else {
            this.store.dispatch(LocationActions.selectLocation({location: location}));
        }
    }

    toggleSpice(level: number) {
        let locations: LocationEntity[] = [];
        for(let locationEntry in this.mapLocationsBySpice[level]) {
            locations.push(this.mapLocationsBySpice[level][locationEntry]);
        }
        this.toggleSpice[level] = !this.toggleSpice[level];
        this.store.dispatch(LocationActions.selectManyLocations({
            locations: locations,
            toggleValue: this.toggleSpice[level]
        }));
    }
}
