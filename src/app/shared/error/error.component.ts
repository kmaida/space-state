import { Component, OnInit, Input } from '@angular/core';
import { StateService } from 'src/app/data/state.service';

@Component({
  selector: 'app-error',
  templateUrl: './error.component.html',
  styleUrls: ['./error.component.css']
})
export class ErrorComponent implements OnInit {
  @Input() msg: string;

  constructor(public state: StateService) { }

  ngOnInit() {
  }

}
