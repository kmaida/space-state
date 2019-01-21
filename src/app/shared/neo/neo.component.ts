import {
  Component,
  OnInit,
  Input,
  ChangeDetectionStrategy
} from '@angular/core';
import { INEO, INEONICKNAME } from '../../data/data.model';
import { DataService } from 'src/app/data/data.service';

@Component({
  selector: 'app-neo',
  templateUrl: './neo.component.html',
  styles: [],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NeoComponent implements OnInit {
  @Input() neo: INEO;

  constructor(private data: DataService) { }

  ngOnInit() {
  }

  getHazardText(hazardous: boolean): string {
    return !hazardous ?
      'No extinction-level event predicted' :
      'Call Ben Affleck, it might be ARMAGEDDON!';
  }

  onSubmitNickname(neoNickname: INEONICKNAME) {
    this.data.updateNickname(neoNickname);
  }

}
