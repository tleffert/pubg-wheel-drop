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

    @ContentChild(LocationGroupToggle, { read: TemplateRef })
    groupToggleTemplate: TemplateRef<any>;

    @ContentChild(LocationOptionTemplateDirective, { read: TemplateRef })
    locationOptionTemplate: TemplateRef<any>;

    constructor() {}

    ngOnInit() {}

}
