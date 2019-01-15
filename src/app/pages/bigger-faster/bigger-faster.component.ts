import { Component, OnInit } from '@angular/core';
import { DataService } from './../../data/data.service';
import { UtilsService } from './../../data/utils.service';
import { filter, map, tap } from 'rxjs/operators';

@Component({
  selector: 'app-bigger-faster',
  templateUrl: './bigger-faster.component.html',
  styles: []
})
export class BiggerFasterComponent implements OnInit {
  loading = true;
  biggerFasterNeo$ = this.data.neo$.pipe(
    filter(neoList => !!neoList === true),
    map(neoList => neoList.filter(neo => {
      if (neo.estimated_diameter > 0.5 || neo.relative_velocity > 50000) {
        return neo;
      }
    })),
    tap(bigFastNeoList => this.loading = false)
  );
  error$ = this.data.errors$.pipe(
    tap(msg => this.loading = false)
  );

  constructor(
    private data: DataService,
    public utils: UtilsService
  ) { }

  ngOnInit() {
  }

}
