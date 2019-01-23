import { Component, OnInit } from '@angular/core';
import { DataService } from './../../data/data.service';
import { UtilsService } from './../../data/utils.service';
import { filter, map } from 'rxjs/operators';
import { ApiService } from './../../data/api.service';
import { expandCollapse } from './../../shared/expand-collapse.animation';
import { list } from './../../shared/list.animation';

@Component({
  selector: 'app-bigger-faster',
  templateUrl: './bigger-faster.component.html',
  styles: [],
  animations: [expandCollapse, list]
})
export class BiggerFasterComponent implements OnInit {
  biggerFasterNeo$ = this.data.neo$.pipe(
    filter(neoList => !!neoList === true),
    map(neoList => neoList.filter(neo => {
      if (neo.estimated_diameter > 0.5 || neo.relative_velocity > 50000) {
        return neo;
      }
    }))
  );

  constructor(
    public data: DataService,
    public api: ApiService,
    public utils: UtilsService
  ) { }

  ngOnInit() {
  }

  trackByID(index, item) {
    return item.id;
  }

}
