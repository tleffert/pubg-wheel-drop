import { Component, OnInit, NgModule, Input, HostListener } from '@angular/core';
import { Location } from '../../types/Location.type';

@Component({
  selector: 'location-option',
})
export class LocationSelectComponent {

    @Input()
    location : Location;

    constructor() {

    }

    @HostListener('click')
    locationSelect() {
        // report this got selected
    }
}
