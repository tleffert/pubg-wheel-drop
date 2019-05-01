import { Component, OnInit } from '@angular/core';

import { StreamService } from '@app/api';

@Component({
  selector: 'app-steam-status',
  templateUrl: './steam-status.component.html',
  styleUrls: ['./steam-status.component.css']
})
export class SteamStatusComponent implements OnInit {

  constructor(private streamService: StreamService) { }

  streamStatus: any = {};

  ngOnInit() {

    this.streamService.getStreamsStatus()
    .subscribe(statusObject => {
      this.streamStatus = statusObject;
    });
  }

}
