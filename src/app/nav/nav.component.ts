import { Component, OnInit, NgModule, Input, Output } from '@angular/core';
import { LocationApiService } from '../../services/location-api.service';
import { Location } from '../../types/Location.type';
import { EventService } from '../../services/eventService.service';
import { StreamService } from '../../services/streamService.service';

@Component({
  selector: 'nav-primary',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css'],
})
export class NavComponent implements OnInit {

    private map : string = 'Erangel';
    private locationSelectToggle : boolean = false;
    private streamStatus : any = {
        will : false,
        frank : false,
        mike : false,
        trevor : false
    };

    constructor(private locationService : LocationApiService,
         private eventService : EventService,
         private streamService : StreamService) {
    }

    ngOnInit() {
        this.streamService.checkLive();
        this.streamService.getStreamsStatus()
        .subscribe(status => {
            let keys = Object.keys(status);
            keys.forEach(key => {
                this.streamStatus[status[key].name] = status[key].isLive;
            })
        });
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
