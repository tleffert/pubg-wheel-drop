import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
import { Location } from '../types/Location.type';

@Injectable()
export class StreamService {

  constructor(private http: HttpClient) { }

  getStreamsStatus() : Observable<any> {
      return this.http.get('/api/live/streamer-status/');
  }

  checkLive() : void {
      this.http.get('/api/live/checkLive')
      .subscribe(response => {

      });
  }

}
