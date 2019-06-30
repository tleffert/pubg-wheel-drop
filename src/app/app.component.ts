import { Component, Renderer2 } from '@angular/core';
import { AlertModule } from 'ngx-bootstrap';

import { tap, filter } from 'rxjs/operators';

import { EventService } from './shared/services/eventService.service';

import { Store } from '@ngrx/store';
import { MapSelectors, MapEntity } from '@app/store';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app';
  showLocationNav : boolean = false;
  private selectedMap: MapEntity;

  constructor(
      private store: Store<any>,
      private renderer: Renderer2,
      eventService : EventService
  ) {
      // Watching the selected map to change the 'themeing' of the wheel
      this.store.select(MapSelectors.getSelectedMap)
      .pipe(
          filter(selectedMap => !!selectedMap),
          tap(selectedMap => {
              // Removing old map class
              if(this.selectedMap) {
                  this.renderer.removeClass(document.body, this.selectedMap.name);
              }
              this.selectedMap = selectedMap;
              // Adding new map class
              this.renderer.addClass(document.body, selectedMap.name);
          })
      ).subscribe();

      eventService.on("TOGGLE_LOCATION_SELECT", showLocationToggleValue => {
          this.showLocationNav = showLocationToggleValue;
      });
  }
}
