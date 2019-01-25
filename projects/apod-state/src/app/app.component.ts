import { Component, OnInit } from '@angular/core';
import { DataService } from './data/apod-data.service';

@Component({
  selector: 'apod-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'apod-state';

  constructor(public data: DataService) { }

  ngOnInit() {
    this.data.init$().subscribe();
  }
}
