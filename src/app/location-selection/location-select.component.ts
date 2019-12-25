import { Component, OnInit, Input, Output, EventEmitter, OnChanges, SimpleChanges } from '@angular/core';

import { Map as GameMap, Location } from '@app/types';
import { trigger, state, style, animate, transition } from '@angular/animations';

export interface LocationGroup {
    level: number;
    groupSelected: boolean;
    locations: Map<string, Location>;
}

@Component({
  selector: 'location-select',
  templateUrl: './location-select.component.html',
  styleUrls: ['./location-select.component.scss']
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
    groups: Array<Location[]> = new Array<Location[]>(3);

    groupSelect = [false, false, false];

    constructor() {}

    ngOnInit() {
        this.createGroups();
    }

    createGroups() {
        this.resetLocations();
        this.locations.forEach(location => {
            if(!this.groups[location.level - 1]) {
                this.groups[location.level - 1] = [];
            }
            this.groups[location.level - 1].push(location);
        });

        this.groups.forEach((group, index) => {
            let allGroupSelected = group.every(groupLocation => {
                return groupLocation.selected === true;
            });
            this.groupSelect[index] = allGroupSelected;
        })
    }

    ngOnChanges(changes: SimpleChanges) {
        let mapUpdated: boolean;
        if(changes.map) {
            mapUpdated = changes.map.firstChange ||
             (changes.map.previousValue && changes.map.previousValue._id !== changes.map.currentValue._id);
        }

        if(mapUpdated) {
            this.resetLocations();
        }

        if(mapUpdated && changes.locations) {
            this.createGroups();
        }
    }

    private resetLocations() {
        this.groups = new Array<Location[]>(3);
    }

    filterLocationsBySpice(level: number) {
        return this.locations.filter(location => {
            return location.level === level;
        });
    }

    toggleOption(location: Location) {
        this.selected.emit(location);
    }

    toggleSpiceGroup(spice: any) {
        this.groupSelect[spice] = !this.groupSelect[spice];

        this.groups[spice].forEach(location => {
            location.selected = this.groupSelect[spice];
        });
        this.selected.emit([...this.groups[spice]]);
    }

    selectedUpdate(selected: boolean, location: Location) {
        location.selected = selected;
        this.selected.emit(location);
        let allGroupSelected = this.groups[location.level-1].every(groupLocation => {
            return groupLocation.selected;
        });
        this.groupSelect[location.level-1] = allGroupSelected;
    }
}
