import { Component, Renderer2 } from '@angular/core';
import { AlertModule } from 'ngx-bootstrap';

import { tap, filter, first } from 'rxjs/operators';


import { Store } from '@ngrx/store';
import { MapSelectors, MapEntity, MapActions, LocationEntity, LocationSelectors, LocationActions } from '@app/store';
import { Location } from '@app/types';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app';
  showLocationNav : boolean = true;
  selectedMap: MapEntity;
  maps: Array<MapEntity>;
  mapLocations: LocationEntity[];

  constructor(
      private store: Store<any>,
      private renderer: Renderer2
  ) {

    this.store.select(MapSelectors.selectAllMaps)
    .pipe(
        filter(maps => !!maps.length),
        tap(maps => {
            this.maps = maps;
        }),
        // first(),
        tap(() => {
            this.thing();
        })
    ).subscribe();

    this.store.select(LocationSelectors.getSelectedMapLocations)
    .pipe(
        tap(locations => {
            this.mapLocations = locations;
        })
    ).subscribe();

  }

  setSelectMap(selectedMap: MapEntity) {
     this.store.dispatch(MapActions.selectMap({map: selectedMap}));
  }


  toggleLocationNav() : void {
     this.showLocationNav = true;
  }

  updateSelected(selected: Location | Location[]) {
      if(Array.isArray(selected)) {
          this.store.dispatch(LocationActions.selectManyLocations({
              locations: selected,
              toggleValue: true
          }));
      } else {
          if(selected.selected){
              this.store.dispatch(LocationActions.deselectLocation({
                  location: selected
              }));
          } else {
              this.store.dispatch(LocationActions.selectLocation({
                  location: selected
              }));
          }
      }
  }

  thing() {
      // Watching the selected map to change the 'themeing' of the wheel
      this.store.select(MapSelectors.getSelectedMap)
      .pipe(
          tap(selectedMap => {
              if(!selectedMap && this.maps) {
                  this.store.dispatch(MapActions.selectMap({map: this.maps[0]}));
              }
          }),
          filter(selectedMap => !!selectedMap),
          tap(selectedMap => {
              this.selectedMap = selectedMap;

              // Removing old map class
              if(this.selectedMap) {
                  this.renderer.removeClass(document.body, this.selectedMap.name);
              }
              // Adding new map class
              this.renderer.addClass(document.body, selectedMap.name);

          })
      ).subscribe();
  }


}
