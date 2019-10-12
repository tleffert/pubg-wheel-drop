import { Component, OnInit, Input, Output, EventEmitter, OnChanges, SimpleChanges } from '@angular/core';

import { Map as GameMap, Location } from '@app/types';

export interface LocationGroup {
    level: number;
    groupSelected: boolean;
    locations: Map<string, Location>;
}

@Component({
  selector: 'location-select',
  templateUrl: './location-select.component.html',
  styleUrls: ['./location-select.component.scss'],
})
export class LocationSelectComponent implements OnInit, OnChanges {

    @Input()
    map: GameMap;

    @Input()
    locations: Location[];

    @Output()
    selected: EventEmitter<Location | Location[]> = new EventEmitter<Location | Location[]>();

    // each index is considered a spice leve/group
    locationBySpice: LocationGroup[];

    // Just to make Array available in the template
    arr = Array;

    constructor() {
        this.resetLocations();
    }

    ngOnInit() {}

    ngOnChanges(changes: SimpleChanges) {
        if(changes.map) {
            this.resetLocations();
        }

        if(this.locationBySpice && changes.locations) {
            changes.locations.currentValue.forEach((location: Location) => {
                if(!this.locationBySpice[location.level - 1].locations) {
                    this.locationBySpice[location.level - 1].locations = new Map<string, Location>();
                }
                this.locationBySpice[location.level - 1].locations.set(location._id, location);
            });
        }
    }

    private resetLocations() {
        this.locationBySpice =  [
            {locations: new Map<string, Location>()} as LocationGroup,
            {locations: new Map<string, Location>()} as LocationGroup,
            {locations: new Map<string, Location>()} as LocationGroup,
        ];
    }

    filterLocationsBySpice(level: number) {
        return this.locations.filter(location => {
            return location.level === level;
        });
    }

    toggleOption(location: Location) {
        this.selected.emit(location);
    }

    toggleSpiceGroup(spice: number) {
        this.locationBySpice[spice].groupSelected = !this.locationBySpice[spice].groupSelected;
        this.selected.emit(
            Array.from(this.locationBySpice[spice].locations.values())
        );
    }
}
