import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-error',
  template: `
    <div class="alert alert-danger">
      <strong class="pr-1">Houston, we have a problem.</strong>
      <span *ngIf="msg else defaultMsg">{{ msg }}</span>
      <ng-template #defaultMsg>Something went wrong. Please try again!</ng-template>
    </div>
  `,
  styles: []
})
export class ErrorComponent implements OnInit {
  @Input() msg: string;

  constructor() { }

  ngOnInit() {
  }

}
