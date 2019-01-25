import { Component, OnInit } from '@angular/core';
import { UtilsService } from 'src/app/data/utils.service';
import { filter, map } from 'rxjs/operators';
import { DataService } from 'src/app/data/data.service';
import { toast } from 'src/app/shared/animations/toast.animation';
import { list } from 'src/app/shared/animations/list.animation';

@Component({
  selector: 'app-mini',
  templateUrl: './mini.component.html',
  styles: [],
  animations: [toast, list]
})
export class MiniComponent implements OnInit {
  miniNeo$ = this.data.neoStore$.pipe(
    filter(neoList => !!neoList === true),
    map(neoList => neoList.filter(neo => {
      if (neo.estimated_diameter < 0.25) {
        return neo;
      }
    }))
  );

  constructor(
    public data: DataService,
    public utils: UtilsService
  ) { }

  ngOnInit() {
  }

  trackByID(index, item) {
    return item.id;
  }

}
