import { Component, OnInit } from '@angular/core';
import { ApiService } from './data/api.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  constructor(public api: ApiService) {}

  ngOnInit() {
    this.api.getNEOToday$().subscribe();
  }

}
