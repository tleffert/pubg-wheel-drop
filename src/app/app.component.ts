import { Component, Renderer2 } from '@angular/core';

import { tap, filter, distinctUntilChanged, share } from 'rxjs/operators';
import { Store } from '@ngrx/store';
import { MapSelectors, MapEntity, MapActions, LocationEntity, LocationSelectors, LocationActions, WheelActions, WheelSelectors } from '@app/store';
import { Location } from '@app/types';
import { Observable } from 'rxjs';
import { trigger, transition, style, animate } from '@angular/animations';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  animations: [
    trigger('slideInOut', [
      transition(':enter', [
        style({transform: 'translateY(-15%)', opacity: .3}),
        animate('200ms ease-in', style({transform: 'translateY(0%)', opacity: .9}))
      ]),
      transition(':leave', [
          style({transform: 'translateY(0%)', opacity: .9}),
        animate('200ms ease-in', style({transform: 'translateY(-15%)', opacity: .3}))
      ])
    ])
  ]
})
export class AppComponent {
  title = 'app';
  locationSelectToggle : boolean = true;
  selectedMap$: Observable<MapEntity> = new Observable<MapEntity>();
  maps$: Observable<MapEntity[]>;
  mapLocations$: Observable<LocationEntity[]>;
  winner$: Observable<any>;
  spinning$: Observable<boolean>;
  currentMap: MapEntity;

  constructor(
      private store: Store<any>,
      private renderer: Renderer2
  ) {
      this.store.dispatch(MapActions.fetchAllMaps());
      this.maps$ = this.store.select(MapSelectors.selectAllMaps).pipe(
          filter(maps => !!maps.length),
          tap(maps => {
              this.store.dispatch(MapActions.selectMap({
                  map: maps.find(map => map.default)
              }))
          })
      );

      this.winner$ = this.store.select(WheelSelectors.getWinner);
      this.spinning$ = this.store.select(WheelSelectors.getWheelSpinning).pipe(
          tap(spinning => {
             if(spinning) {
                 this.locationSelectToggle = false;
             }
          })
      );

      this.selectedMap$ = this.store.select(MapSelectors.getSelectedMap)
       .pipe(
           filter(selectedMap => !!selectedMap),
           distinctUntilChanged(),
           tap((selectedMap) => {
               // Removing old map class
               if(this.currentMap) {
                   this.renderer.removeClass(document.body, this.currentMap.name);
               }
               // Adding new map class
               this.renderer.addClass(document.body, selectedMap.name);
               this.store.dispatch(LocationActions.fetchAllLocationsByMap({
                   map: selectedMap
               }));
               this.currentMap = selectedMap;
           }),
           share()
       );

       this.mapLocations$ = this.store.select(LocationSelectors.getSelectedMapLocations);
  }

  setSelectMap(selectedMap: MapEntity) {
     this.store.dispatch(MapActions.selectMap({map: selectedMap}));
  }


  toggleLocationNav() : void {
     this.locationSelectToggle = !this.locationSelectToggle;
  }

  updateSelected(update: Location | Location[]) {
      if(Array.isArray(update)) {
          this.store.dispatch(LocationActions.selectManyLocations({
              locations: update,
              toggleValue: update[0].selected
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

  handleWinner(winner: Location) {
      this.store.dispatch(WheelActions.announceLocationWinner({
          location: winner
      }));
  }

  spinHandler(spinning: boolean) {
      if(spinning) {
          this.store.dispatch(WheelActions.startSpin());
      } else {
          this.store.dispatch(WheelActions.endSpin());
      }
  }


}
