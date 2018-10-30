import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Location } from '../types/Location.type';
import { tap } from 'rxjs/operators';

@Injectable()
export class LocationApiService {
    private locationCache = {};

  constructor(private http: HttpClient) { }

  getMapLocations(map) : Observable<any> {
      return this.http.get('/api/location/list/'+map);
  }

  reportWinner(locationId) : Observable<any> {
      return this.http.post('/api/location/winner/'+locationId, {});
  }

}
