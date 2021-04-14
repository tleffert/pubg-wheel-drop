import { AfterViewInit, Component, ElementRef, OnInit, Renderer2, ViewChild } from '@angular/core';
import { trigger, transition, style, animate } from '@angular/animations';

import { tap, filter, distinctUntilChanged, share } from 'rxjs/operators';
import { Store } from '@ngrx/store';
import { MapSelectors, MapEntity, MapActions, LocationEntity, LocationSelectors, LocationActions, WheelActions, WheelSelectors } from '@app/store';
import { Observable } from 'rxjs';
import { faMapMarkerAlt } from '@fortawesome/free-solid-svg-icons';

import { Location } from '@app/types';


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
export class AppComponent implements OnInit, AfterViewInit {

    @ViewChild('mapimg') mapBackground: ElementRef;
    title = 'app';

    // fontawesome icon component for template
    faMapMarkerAlt = faMapMarkerAlt;

    locationSelectToggle : boolean = true;

    // currently selected map
    currentMap: MapEntity;

    // Store selector helpers/listeners
    selectedMap$: Observable<MapEntity> = new Observable<MapEntity>();
    maps$: Observable<MapEntity[]>;
    mapLocations$: Observable<LocationEntity[]>;
    winner$: Observable<any>;
    spinning$: Observable<boolean>;


  constructor(
      private store: Store<any>,
      private renderer: Renderer2
  ) {

  }

  ngOnInit() {
      // listener for all selectable maps
      this.maps$ = this.store.select(MapSelectors.selectAllMaps).pipe(
          filter(maps => !!maps.length)
      );

      // listener for the winning locations after a wheel spin
      this.winner$ = this.store.select(WheelSelectors.getWinner);

      // helper to know when the wheel is spinning
      this.spinning$ = this.store.select(WheelSelectors.getWheelSpinning).pipe(
          tap(spinning => {
             if(spinning) {
                 this.locationSelectToggle = false;
             }
          })
      );

      // listener for what the currently selected map is
      this.selectedMap$ = this.store.select(MapSelectors.getSelectedMap)
       .pipe(
           filter(selectedMap => !!selectedMap),
           distinctUntilChanged(),
           tap(selectedMap => this.currentMap = selectedMap),
           share()
       );

       // listener for the locations of the currently selected map (selected map from the store)
       this.mapLocations$ = this.store.select(LocationSelectors.getSelectedMapLocations);
  }

  ngAfterViewInit() {
      // Helper to switchout the background based on the selected map
      this.selectedMap$.pipe(
          tap((selectedMap) => {
              // Removing old map class
              if(this.currentMap) {
                  this.renderer.removeClass(this.mapBackground.nativeElement, this.currentMap.name);
              }
              // Adding new map class
              this.renderer.addClass(this.mapBackground.nativeElement, selectedMap.name);
              this.currentMap = selectedMap;
          })
      ).subscribe()
  }

  setSelectMap(selectedMap: MapEntity) {
     this.store.dispatch(MapActions.selectMap({map: selectedMap}));
  }

  toggleLocationNav() : void {
     this.locationSelectToggle = !this.locationSelectToggle;
  }

  updateSelected(update: Location) {
      if(!update.selected){
          this.store.dispatch(LocationActions.selectLocation({
              location: update
          }));
      } else {
          this.store.dispatch(LocationActions.deselectLocation({
              location: update
          }));
      }
  }

  updateSpiceToggle(spice) {
      this.store.dispatch(LocationActions.toggleSpiceGroup({
          spiceLevel: spice,
          map: this.currentMap
      }));
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
