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
    set locations(locations: Location[]) {
        if (locations) {
            // Getting locations but we want to split them based on spice levels
            this.resetLocations();
            this.createGroups(locations);
        }
    };

    @Output()
    selected: EventEmitter<Location> = new EventEmitter<Location>();

    @Output()
    toggleSpice:  EventEmitter<number> = new EventEmitter<number>();

    // each index is considered a spice leve/group
    locationBySpice: LocationGroup[];

    // Just to make Array available in the template
    arr = Array;
    groups: Array<Location[]> = new Array<Location[]>(3);

    groupSelect = [false, false, false];

    constructor() {}

    ngOnInit() {

    }

    /**
     * Takes in an array of Locations and creates groups based on spiceLevel
     * @param  locations [description]
     * @return           [description]
     */
    createGroups(locations: Location[]) {

        locations.forEach(location => {
            if(!this.groups[location.level - 1]) {
                this.groups[location.level - 1] = [];
            }
            this.groups[location.level - 1].push({...location});
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
            // On first load and if the map ids have changed - we've got a 'new' map
            mapUpdated = changes.map.firstChange ||
             (changes.map.previousValue && changes.map.previousValue._id !== changes.map.currentValue._id);
        }

        // If our map has changed we need to reset the groups/locations
        if(mapUpdated) {
            this.resetLocations();
        }

        if(mapUpdated && changes.locations.currentValue) {
        //    this.resetLocations();
            this.createGroups(changes.locations.currentValue);
        }
    }

    // Resets the calculated location groups
    private resetLocations() {
        this.groups = new Array<Location[]>(3);
    }

    filterLocationsBySpice(level: number) {
        return this.locations.filter(location => {
            return location.level === level;
        });
    }

    // Emits event with the toggled spice level
    toggleSpiceGroup(spice: number) {
        this.toggleSpice.emit(spice);
    }

    // Emits event for the selected/toggled location
    selectedUpdate(location: Location) {
        this.selected.emit(location);
    }
}
