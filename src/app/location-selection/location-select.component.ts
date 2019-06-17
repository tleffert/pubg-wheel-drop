import { Component, OnInit, NgModule, Input } from '@angular/core';

import { tap, takeWhile, switchMap, filter } from 'rxjs/operators';
import { Store } from '@ngrx/store';

import { LocationSelectors, LocationEntity, LocationActions, MapSelectors} from '@app/store';
import { LocationApiService } from '@app/api';
import { EventService } from '../shared/services/eventService.service';

@Component({
  selector: 'location-select',
  templateUrl: './location-select.component.html',
  styleUrls: ['./location-select.component.css'],
})
export class LocationSelectComponent implements OnInit {

    @Input()
    map : string;

    locationSpice1 : LocationEntity[] = [];
    locationSpice2 : LocationEntity[] = [];
    locationSpice3 : LocationEntity[] = [];

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
                this.locationSpice1 = mapLocations.filter(location => {
                    return location.level == 1;
                });
                this.locationSpice2 = mapLocations.filter(location => {
                    return location.level == 2;
                });
                this.locationSpice3 = mapLocations.filter(location => {
                    return location.level == 3;
                });
            })
        ).subscribe()
    }

    ngOnInit() {
    }

    resetLocations() : void {
        this.locationSpice1 = [];
        this.locationSpice2 = [];
        this.locationSpice3 = [];
    }

    toggleOption(location : LocationEntity) : void {
        if(location.selected) {
            this.store.dispatch(LocationActions.deselectLocation({location: location}));
        } else {
            this.store.dispatch(LocationActions.selectLocation({location: location}));
        }

    }
}
