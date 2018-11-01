import { Component, OnInit, AfterViewInit } from '@angular/core';
import { LocationApiService } from '../../services/location-api.service';
import { Location } from '../../types/Location.type';
import { EventService } from '../../services/eventService.service';
import { StreamService } from '../../services/streamService.service';
import swal from 'sweetalert2/dist/sweetalert2.all.min.js'

@Component({
  selector: 'nav-primary',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css'],
})
export class NavComponent implements OnInit, AfterViewInit {

    private map : string = 'Erangel';
    private locationSelectToggle : boolean = false;
    private streamStatus : any = {
        will : false,
        frank : false,
        mike : false,
        trevor : false
    };

    constructor(
         private eventService : EventService,
         private streamService : StreamService
     ) {}

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

    // Used to kick off initial selection of wheel map
    ngAfterViewInit() {
        this.selectMap(this.map);
    }

    toggleLocationNav() : void {
        if(this.map !== 'Bonus'){
            this.locationSelectToggle = !this.locationSelectToggle;
            this.eventService.broadcast("TOGGLE_LOCATION_SELECT", this.locationSelectToggle);
        }
    }

    selectMap(map) : void {
        this.map = map;
        this.eventService.broadcast("MAP_SELECT", map);
    }

    showInfo() {
        swal({
            title: "Would you like to know more?",
            html:
            `
            <div id="accordion">
              <div class="card">
                <div class="card-header">
                  <h5 class="mb-0">
                    <button class="btn btn-link" data-toggle="collapse" data-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
                      What is this wheel, and what do I do with it?
                    </button>
                  </h5>
                </div>

                <div id="collapseOne" class="collapse show" aria-labelledby="headingOne" data-parent="#accordion">
                  <div class="card-body">
                    <small>
                        Sometimes you need guidance for where to go when dropping onto an island with 100-ish other people.
                        <strong>The catch being that before you can start looting, you must reach the winning destination first</strong>!
                    </small>
                  </div>
                </div>
              </div>
              <div class="card">
                <div class="card-header">
                  <h5 class="mb-0">
                    <button class="btn btn-link collapsed" data-toggle="collapse" data-target="#collapseTwo" aria-expanded="false" aria-controls="collapseTwo">
                      Bonus wheel?
                    </button>
                  </h5>
                </div>
                <div id="collapseTwo" class="collapse" aria-labelledby="headingTwo" data-parent="#accordion">
                  <div class="card-body">
                    <ul class="list-group list-group-flush">
                    <li class="list-group-item">
                        <small>
                            The bonus wheel assigns mutators to your game! Offers different ways to explore your island adventures!
                            Listed below are the mutators and a short description.
                        </small>
                    </li>
                        <li class="list-group-item">
                            <h4>Winters Run</h4>
                            <small>Everyone marks a location on the map and must loot selected location before meeting up with rest of team.</small>
                        </li>
                        <li class="list-group-item">
                            <h4>Pooper Scooper</h4>
                            <small>See a plane, chase the plane, scoop the poop.</small>
                        </li>
                        <li class="list-group-item">
                            <h4>Can't Stop, Won't Stop</h4>
                            <small>Always be moving! No sitting around.</small>
                        </li>
                        <li class="list-group-item">
                            <h4>Protect the VIP</h4>
                            <small>The VIP can only equip armor and pistols. If the VIP dies, team frags out.</small>
                        </li>
                        <li class="list-group-item">
                            <h4>Dare</h4>
                            <small>Dare to be great! If the dare gets the person knocked or killed, the issuer must revive or get revenge.</small>
                        </li>
                        <li class="list-group-item">
                            <h4>Sticky Bows</h4>
                            <small>See a bow? It's yours now! No dropping it till you get a kill with it.</small>
                        </li>
                        <li class="list-group-item">
                            <h4>Love at first sight</h4>
                            <small>You must equip each slot with the first weapon you see that fills that slot. Can only loot other weapons off of killed players.</small>
                        </li>
                        <li class="list-group-item">
                            <h4>Saving Private Ryan</h4>
                            <small>3 players drop at the start of the flight path. The 4th drops at the end, and the rest of team comes for the rescue!</small>
                        </li>
                        <li class="list-group-item">
                            <h4>Running Man</h4>
                            <small>No cars, just run.</small>
                        </li>
                        <li class="list-group-item">
                            <h4>Stuntin'</h4>
                            <small>Only vehicle you can use are motorcycles. In order to get off the bike you must do a flip.</small>
                        </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
            `
        });
    }
}
