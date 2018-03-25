import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Location } from '../types/Location.type';
import { Subject } from 'rxjs/Subject';

@Injectable()
export class LocationApiService {
    private selectSubject = new Subject<Location>();

  constructor(private http: HttpClient) { }

  listByMap(map) : Observable<any> {
      return this.http.get('/api/location/list/'+map);
  }

  reportWinner(locationId) : Observable<any> {
      return this.http.post('/api/location/winner/'+locationId, {});
  }

  notifySelected(location : Location) : void {
      this.selectSubject.next(location);
  }

  getLocationSelectSubscription() : Observable<Location> {
      return this.selectSubject.asObservable();
  }

}
