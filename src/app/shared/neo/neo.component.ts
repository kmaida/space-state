import {
  Component,
  OnInit,
  Input,
  Output,
  ChangeDetectionStrategy,
  EventEmitter
} from '@angular/core';
import { INEO, INEONICKNAME } from '../../data/data.interface';

@Component({
  selector: 'app-neo',
  templateUrl: './neo.component.html',
  styles: [],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NeoComponent implements OnInit {
  @Input() neo: INEO;
  @Output() submitNickname = new EventEmitter<INEONICKNAME>();
  neoForm: INEONICKNAME = { id: null, nickname: null };

  constructor() { }

  ngOnInit() {
    this.neoForm.id = this.neo.id;
  }

  getHazardText(hazardous: boolean): string {
    return !hazardous ?
      'No extinction-level event predicted' :
      'Call Ben Affleck, it might be ARMAGEDDON!';
  }

  onSubmit(input: INEONICKNAME) {
    this.submitNickname.emit(input);
  }

}
