import {
  Component,
  OnInit,
  Input,
  ChangeDetectionStrategy
} from '@angular/core';
import { INEO } from './../../data/data.model';
import { ApiService } from 'src/app/data/api.service';

@Component({
  selector: 'app-neo',
  templateUrl: './neo.component.html',
  styles: [],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NeoComponent implements OnInit {
  @Input() neo: INEO;

  constructor(private api: ApiService) { }

  ngOnInit() {
  }

  getHazardText(hazardous: boolean): string {
    return !hazardous ?
      'No extinction-level event predicted' :
      'Call Ben Affleck, it might be ARMAGEDDON!';
  }

  onSubmitNickname(neoNickname: INEO) {
    this.api.addNeoNickname$(neoNickname).subscribe(
      neo => console.log('Successfully updated nickname!', neo)
    );
  }

}
