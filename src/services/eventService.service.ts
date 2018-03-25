import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Location } from '../types/Location.type';
import { Subject } from 'rxjs/Subject';

@Injectable()
export class EventService {
    private _locationToggle = new Subject();
    lTSubscription = this._locationToggle.asObservable();
    private _mapToggle = new Subject();
    mapSubscription = this._mapToggle.asObservable();

    constructor() {}

    toggleLocationSelect() : void {
        this._locationToggle.next();
    }

    selectMap(map) : void {
        this._mapToggle.next(map);
    }


}
