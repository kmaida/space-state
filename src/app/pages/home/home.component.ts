import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { INEO } from './../../data/data.interface';
import { DataService } from 'src/app/data/data.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styles: []
})
export class HomeComponent implements OnInit {

  constructor(
    public data: DataService
  ) { }

  ngOnInit() {
  }

}
