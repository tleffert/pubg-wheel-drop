import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Location, Map } from '@app/types';

@Injectable({
  providedIn: 'root'
})
export class LocationApiService {
    private locationCache = {};

  constructor(private http: HttpClient) { }


  getMaps() : Observable<Array<Map>> {
      return this.http.get<Array<Map>>('/api/maps');
  }

  getMapLocations(mapName: string) : Observable<Array<Location>> {
      return this.http.get<Array<Location>>('/api/maps/'+mapName+'/locations');
  }

  reportWinner(locationId) : Observable<any> {
      return this.http.post('/api/location/winner/'+locationId, {});
  }

}
