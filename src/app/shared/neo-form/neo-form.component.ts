import {
  Component,
  OnInit,
  Input,
  Output,
  ChangeDetectionStrategy,
  EventEmitter
} from '@angular/core';
import { INEO, INEONICKNAME } from '../../data/data.model';

@Component({
  selector: 'app-neo-form',
  templateUrl: './neo-form.component.html',
  styles: [],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NeoFormComponent implements OnInit {
  @Input() neo: INEO;
  @Output() submitNickname = new EventEmitter<INEONICKNAME>();
  neoForm: INEONICKNAME;

  constructor() { }

  ngOnInit() {
    this.resetForm();
  }

  resetForm() {
    this.neoForm = Object.assign({}, {
      id: this.neo.id,
      nickname: this.neo.nickname
    });
  }

  onSubmit(input: INEONICKNAME) {
    this.submitNickname.emit(input);
    this.resetForm();
  }

}
