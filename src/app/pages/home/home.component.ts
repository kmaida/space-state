import { Component, OnInit } from '@angular/core';
import { DataService } from './../../data/data.service';
import { UtilsService } from './../../data/utils.service';
import { tap } from 'rxjs/operators';
import { ApiService } from 'src/app/data/api.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styles: []
})
export class HomeComponent implements OnInit {

  constructor(
    public data: DataService,
    public api: ApiService,
    public utils: UtilsService
  ) {}

  ngOnInit() {
  }

  trackByID(index, item) {
    return item.id;
  }

}
