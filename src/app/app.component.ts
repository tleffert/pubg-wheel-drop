import { Component, Renderer2 } from '@angular/core';
import { AlertModule } from 'ngx-bootstrap';

import { tap, filter, first, distinctUntilChanged, share } from 'rxjs/operators';


import { Store } from '@ngrx/store';
import { MapSelectors, MapEntity, MapActions, LocationEntity, LocationSelectors, LocationActions } from '@app/store';
import { Location } from '@app/types';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app';
  showLocationNav : boolean = true;
  selectedMap$: Observable<MapEntity>;
  maps$: Observable<MapEntity[]>;
  mapLocations$: Observable<LocationEntity[]>;

  constructor(
      private store: Store<any>,
      private renderer: Renderer2
  ) {

      this.maps$ = this.store.select(MapSelectors.selectAllMaps).pipe(
          tap(maps => {
              console.log("MAPS APP", maps)
          })
      );

      this.selectedMap$ = this.store.select(MapSelectors.getSelectedMap)
       .pipe(
           filter(selectedMap => !!selectedMap),
           distinctUntilChanged(),
           tap(selectedMap => {
               // Removing old map class
               // if(this.selectedMap) {
               //     this.renderer.removeClass(document.body, this.selectedMap.name);
               // }
               // Adding new map class
               this.renderer.addClass(document.body, selectedMap.name);
               this.store.dispatch(LocationActions.fetchAllLocationsByMap({
                   map: selectedMap
               }))
           }),
           share()
       );

       this.mapLocations$ = this.store.select(LocationSelectors.getSelectedMapLocations);

  }

  setSelectMap(selectedMap: MapEntity) {
     this.store.dispatch(MapActions.selectMap({map: selectedMap}));
  }


  toggleLocationNav() : void {
     this.showLocationNav = true;
  }

  updateSelected(update: Location | Location[]) {
      if(Array.isArray(update)) {
          this.store.dispatch(LocationActions.selectManyLocations({
              locations: update,
              toggleValue: true
          }));
      } else {
          if(!update.selected){
              this.store.dispatch(LocationActions.deselectLocation({
                  location: update
              }));
          } else {
              this.store.dispatch(LocationActions.selectLocation({
                  location: update
              }));
          }
      }
  }

  thing() {
      // Watching the selected map to change the 'themeing' of the wheel

  }


}
