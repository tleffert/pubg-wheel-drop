import { Injectable } from '@angular/core';
import { BehaviorSubject, from } from 'rxjs';

@Injectable()
export class EventService {

    private eventSubject = new BehaviorSubject({key: null, args: null})
    private _eventBus = from(this.eventSubject);
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

    broadcast(key: string, ...args:any[]) {
        this.eventSubject.next({key, args});
    }

    on(key: string, listenerFunct) {
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
