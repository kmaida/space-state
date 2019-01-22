import { Component, OnInit } from '@angular/core';
import { DataService } from './../../data/data.service';
import { UtilsService } from './../../data/utils.service';
import { tap } from 'rxjs/operators';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styles: []
})
export class HomeComponent implements OnInit {
  loading = true;
  neo$ = this.data.neo$.pipe(
    tap(neoList => {
      if (neoList.length) {
        this.loading = false;
      }
    })
  );
  error$ = this.data.errors$.pipe(
    tap(msg => this.loading = false)
  );

  constructor(
    private data: DataService,
    public utils: UtilsService
  ) {}

  ngOnInit() {
  }

  trackByID(index, item) {
    return item.id;
  }

}
