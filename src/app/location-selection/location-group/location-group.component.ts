import { Component, OnInit, Input, Output, EventEmitter, ViewChild, TemplateRef, ContentChild, AfterContentInit } from '@angular/core';

import { Location } from '@app/types';

import { LocationGroupToggle } from '../location-group-toggle.directive';
import { LocationOptionTemplateDirective } from './location-option-template.directive';

export interface SelectableLocation {
    location: Location;
    selected: boolean;
}

@Component({
  selector: 'app-location-group',
  templateUrl: './location-group.component.html',
  styleUrls: ['./location-group.component.scss']
})
export class LocationGroupComponent implements OnInit {

    @Input()
    locations: Location[] = [];

    @Output()
    selectedLocation = new EventEmitter<SelectableLocation>();

    @ContentChild(LocationGroupToggle, { read: TemplateRef })
    groupToggleTemplate: TemplateRef<any>;

    @ContentChild(LocationOptionTemplateDirective, { read: TemplateRef })
    locationOptionTemplate: TemplateRef<any>;

    allSelected: boolean;

    numSelected: number;

    locationMap: Map<string, SelectableLocation> = new Map();

    constructor() {}

    ngOnInit() {
        this.locations.forEach(location => {
            this.locationMap.set(location._id, {
                location: location,
                selected: location.selected
            });
        });
    }

    selectedUpate(selected: boolean, location: Location) {
        this.locationMap.get(location._id).selected = selected;
        this.selectedLocation.emit(this.locationMap.get(location._id));
    }

}
