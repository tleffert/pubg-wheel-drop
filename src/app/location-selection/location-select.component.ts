import { Component, OnInit, NgModule, Input } from '@angular/core';
import { LocationApiService } from '../../services/location-api.service';
import { Location } from '../../types/Location.type';
import { EventService } from '../../services/eventService.service';

@Component({
  selector: 'location-select',
  templateUrl: './location-select.component.html',
  styleUrls: ['./location-select.component.css'],
})
export class LocationSelectComponent implements OnInit {

    @Input()
    map : string;

    private locationSpice1 : Location[] = [];
    private locationSpice2 : Location[] = [];
    private locationSpice3 : Location[] = [];

    constructor(private locationService : LocationApiService, private eventService : EventService) {
        this.eventService.mapSubscription
        .subscribe(map => {
            this.locationService.listByMap(map)
            .subscribe(locations => {
                this.resetLocations();
                locations.forEach(location => {
                    if(location.level == 1){
                        this.locationSpice1.push(location);
                    }
                    if(location.level == 2){
                        this.locationSpice2.push(location);
                    }
                    if(location.level == 3){
                        this.locationSpice3.push(location);
                    }
                });
            });
        });

    }

    ngOnInit() {
        this.locationService.listByMap('Erangel')
        .subscribe(locations => {
            locations.forEach(location => {
                if(location.level == 1){
                    this.locationSpice1.push(location);
                }
                if(location.level == 2){
                    this.locationSpice2.push(location);
                }
                if(location.level == 3){
                    this.locationSpice3.push(location);
                }
            });
        });
    }

    resetLocations() : void {
        this.locationSpice1 = [];
        this.locationSpice2 = [];
        this.locationSpice3 = [];
    }

    toggleOption(location : Location) : void {
        location.selected = !location.selected;
        this.locationService.notifySelected(location);
    }
}
