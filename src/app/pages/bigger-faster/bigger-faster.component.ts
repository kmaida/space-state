import { Component, OnInit } from '@angular/core';
import { StateService } from '../../data/state.service';
import { UtilsService } from './../../data/utils.service';
import { filter, map } from 'rxjs/operators';
import { DataService } from '../../data/data.service';
import { toast } from '../../shared/toast.animation';
import { list } from './../../shared/list.animation';

@Component({
  selector: 'app-bigger-faster',
  templateUrl: './bigger-faster.component.html',
  styles: [],
  animations: [toast, list]
})
export class BiggerFasterComponent implements OnInit {
  biggerFasterNeo$ = this.state.neo$.pipe(
    filter(neoList => !!neoList === true),
    map(neoList => neoList.filter(neo => {
      if (neo.estimated_diameter > 0.5 || neo.relative_velocity > 50000) {
        return neo;
      }
    }))
  );

  constructor(
    public state: StateService,
    public data: DataService,
    public utils: UtilsService
  ) { }

  ngOnInit() {
  }

  trackByID(index, item) {
    return item.id;
  }

}
