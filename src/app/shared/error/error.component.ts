import { Component, OnInit, Input } from '@angular/core';
import { DataService } from 'src/app/data/data.service';

@Component({
  selector: 'app-error',
  templateUrl: './error.component.html',
  styleUrls: ['./error.component.css']
})
export class ErrorComponent implements OnInit {
  @Input() msg: string;

  constructor(public data: DataService) { }

  ngOnInit() {
  }

}
