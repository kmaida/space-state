import { Component, OnInit } from '@angular/core';
import { UtilsService } from 'src/app/data/utils.service';
import { DataService } from 'src/app/data/data.service';
import { toast } from 'src/app/shared/animations/toast.animation';
import { list } from 'src/app/shared/animations/list.animation';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styles: [],
  animations: [toast, list]
})
export class HomeComponent implements OnInit {

  constructor(
    public data: DataService,
    public utils: UtilsService
  ) {}

  ngOnInit() {
  }

}
