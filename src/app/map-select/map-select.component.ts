import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

import { MapEntity } from '@app/store';

@Component({
  selector: 'app-map-select',
  templateUrl: './map-select.component.html',
  styleUrls: ['./map-select.component.css']
})
export class MapSelectComponent implements OnInit {

    @Input()
    maps: Array<MapEntity>;

    @Input()
    selectedMap: MapEntity;

    @Output()
    selectedMapChange: EventEmitter<MapEntity> = new EventEmitter<MapEntity>();

    constructor() {}

    ngOnInit() {}

    selectMap(map: MapEntity) {
        this.selectedMapChange.emit(map);
    }


}
