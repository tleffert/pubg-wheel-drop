import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';

import { Observable } from 'rxjs';
import { tap, filter, take } from 'rxjs/operators';
import { Store } from '@ngrx/store';

import { MapEntity } from '../entities/map/map-state';
import { selectAllMaps } from '../entities/map/map-selectors';
import { MapActions } from '../entities/map/map-actions';

@Injectable({
    providedIn: 'root'
})
export class MapsResolver implements Resolve<MapEntity[]> {

  constructor(
      private store: Store<any>
  ) {}

  resolve(): Observable<MapEntity[]> {
      return this.store.select(selectAllMaps)
      .pipe(
          tap(maps => {
              if(!maps.length) {
                  this.store.dispatch(MapActions.fetchAllMaps());
              }
          }),
          filter(maps => !!maps.length),
          take(1),
          tap(maps => {
              console.log("resolve me", maps);
          })
      );
  }
}
