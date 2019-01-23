import { Component, OnInit } from '@angular/core';
import { DataService } from './../../data/data.service';
import { UtilsService } from './../../data/utils.service';
import { ApiService } from './../../data/api.service';
import { toast } from '../../shared/toast.animation';
import { list } from './../../shared/list.animation';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styles: [],
  animations: [toast, list]
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
