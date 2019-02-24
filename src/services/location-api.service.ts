import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Location } from '@app/types';
import { tap } from 'rxjs/operators';

@Injectable()
export class LocationApiService {
    private locationCache = {};

  constructor(private http: HttpClient) { }

  getMapLocations(map) : Observable<Location[]> {
      return this.http.get<Location[]>('/api/location/list/'+map);
  }

  reportWinner(locationId) : Observable<any> {
      return this.http.post('/api/location/winner/'+locationId, {});
  }

}
