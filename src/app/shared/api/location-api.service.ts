import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Location } from '@app/types';

@Injectable({
  providedIn: 'root'
})
export class LocationApiService {
    private locationCache = {};

  constructor(private http: HttpClient) { }


  getMaps() : Observable<any> {
    return this.http.get('/api/maps');
  }

  getMapLocations(map) : Observable<Location[]> {
      return this.http.get<Location[]>('/api/maps/'+map+'/locations');
  }

  reportWinner(locationId) : Observable<any> {
      return this.http.post('/api/location/winner/'+locationId, {});
  }

}
