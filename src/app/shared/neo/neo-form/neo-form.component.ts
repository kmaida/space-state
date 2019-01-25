import {
  Component,
  OnInit,
  Input,
  Output,
  ChangeDetectionStrategy,
  EventEmitter
} from '@angular/core';
import { INEO } from 'src/app/data/data.model';

@Component({
  selector: 'app-neo-form',
  templateUrl: './neo-form.component.html',
  styleUrls: ['./neo-form.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NeoFormComponent implements OnInit {
  @Input() neo: INEO;
  @Input() unsavedNickname: string;
  @Output() submitNickname = new EventEmitter<INEO>();
  neoForm: INEO;

  constructor() { }

  ngOnInit() {
    this.setForm();
  }

  private setForm() {
    this.neoForm = {
      ...this.neo,
      ...{ nickname: this.unsavedNickname || '' }
    };
  }

  onSubmit(input: INEO) {
    this.submitNickname.emit(input);
    this.setForm();
  }

}
