import { Component, OnInit, NgModule, Input } from '@angular/core';
import { LocationApiService } from '../../services/location-api.service';
import { Location } from '../../types/Location.type';
import { EventService } from '../../services/eventService.service';
import { distinctUntilChanged } from 'rxjs/operators';

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

    constructor(
        private locationApi : LocationApiService,
        private eventService : EventService
    ) {}

    ngOnInit() {
        this.eventService.on('MAP_SELECT', map => {
            this.locationApi.getMapLocations(map)
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

        // this.locationService.listByMap('Erangel')
        // .subscribe(locations => {
        //     locations.forEach(location => {
        //         if(location.level == 1){
        //             this.locationSpice1.push(location);
        //         }
        //         if(location.level == 2){
        //             this.locationSpice2.push(location);
        //         }
        //         if(location.level == 3){
        //             this.locationSpice3.push(location);
        //         }
        //     });
        // });
    }

    resetLocations() : void {
        this.locationSpice1 = [];
        this.locationSpice2 = [];
        this.locationSpice3 = [];
    }

    toggleOption(location : Location) : void {

        if(location) {
            location.selected = !location.selected;
            this.eventService.broadcast("LOCATION_SELECTED", location);
        }

    }
}
