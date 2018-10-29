import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Location } from '../types/Location.type';
import { Subject } from 'rxjs/Subject';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

interface BroadcastEvent {
    key: string,
    data?: any
}

@Injectable()
export class EventService {

    private eventSubject = new BehaviorSubject({key: null, args: null})
    private _eventBus = Observable.from(this.eventSubject);
    private listeners: {[key: string] : any};

    constructor() {
        this.listeners = {};
        // Setup to listen for changes in our event bus
        this._eventBus
        .subscribe(({key, args}) => {
            if(this.listeners[key]) {
                // If we have listener functions attached to our key
                // we need to evaluate the functions
                for(let listener of this.listeners[key]){
                    listener(...args);
                }
            }
        })
    }

    broadcast(key: string, ...args) {
        this.eventSubject.next({key, args});
    }

    on(key: string, listenerFunct: Function) {
        if(!this.listeners[key]) {
            this.listeners[key] = [];
        }
        this.listeners[key].push(listenerFunct);
    }

    unsubscribe(key: string) {
        if(this.listeners[key]){
            delete this.listeners[key];
        }
    }
}
