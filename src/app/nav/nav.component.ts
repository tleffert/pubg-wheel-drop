import { Component, OnInit, NgModule, Input, Output } from '@angular/core';
import { LocationApiService } from '../../services/location-api.service';
import { Location } from '../../types/Location.type';
import { EventService } from '../../services/eventService.service';

@Component({
  selector: 'nav-primary',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css'],
})
export class NavComponent implements OnInit {

    private map : string = 'Erangel';
    private locationSelectToggle : boolean = false;

    constructor(private locationService : LocationApiService,
         private eventService : EventService) {

    }

    ngOnInit() {

    }

    toggleLocationNav() : void {
        this.locationSelectToggle = !this.locationSelectToggle;
        this.eventService.toggleLocationSelect();
    }

    selectMap(map) : void {
        this.map = map;
        this.eventService.selectMap(this.map);
    }
}
