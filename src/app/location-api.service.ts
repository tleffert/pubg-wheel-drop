import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable()
export class LocationApiService {

  constructor(private http: HttpClient) { }

  listByMap(map) : Observable<any> {
      return this.http.get('/api/location/list/'+map);
  }

  reportWinner(locationId) : Observable<any> {
      return this.http.post('/api/location/winner/'+locationId, {});
  }

}
