import { Component, OnInit, Input, Output, ChangeDetectionStrategy } from '@angular/core';
import { INEO } from './../../data/data.interface';

@Component({
  selector: 'app-neo',
  templateUrl: './neo.component.html',
  styles: [],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NeoComponent implements OnInit {
  @Input() neo: INEO;

  constructor() { }

  ngOnInit() {
  }

  getHazardText(hazardous: boolean): string {
    return !hazardous ?
      'No extinction-level event predicted' :
      'Call Ben Affleck, it might be ARMAGEDDON!';
  }

}
