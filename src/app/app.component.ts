import { Component } from '@angular/core';
import { AlertModule } from 'ngx-bootstrap';
import { EventService } from './shared/services/eventService.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app';
  showLocationNav : boolean = false;

  constructor(eventService : EventService) {
      eventService.on("TOGGLE_LOCATION_SELECT", showLocationToggleValue => {
          this.showLocationNav = showLocationToggleValue;
      });
  }
}
