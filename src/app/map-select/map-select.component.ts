import { Component, OnInit, Input, Output, EventEmitter, ChangeDetectionStrategy, OnChanges, SimpleChanges } from '@angular/core';

import { MapEntity } from '@app/store';

@Component({
  selector: 'app-map-select',
  templateUrl: './map-select.component.html',
  styleUrls: ['./map-select.component.css'],
  // changeDetection: ChangeDetectionStrategy.OnPush
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
        // No need to emit if currently selected was selected again
        if(map._id !== this.selectedMap._id) {
            this.selectedMapChange.emit(map);
        }
    }


}
