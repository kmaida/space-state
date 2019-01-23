import { Component, OnInit } from '@angular/core';
import { StateService } from '../../data/state.service';
import { UtilsService } from './../../data/utils.service';
import { DataService } from '../../data/data.service';
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
    public state: StateService,
    public data: DataService,
    public utils: UtilsService
  ) {}

  ngOnInit() {
  }

  trackByID(index, item) {
    return item.id;
  }

}
