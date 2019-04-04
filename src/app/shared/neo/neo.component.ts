import {
  Component,
  OnInit,
  Input,
  ChangeDetectionStrategy
} from '@angular/core';
import { INEO } from 'src/app/data/data.model';
import { DataService } from 'src/app/data/data.service';

@Component({
  selector: 'app-neo',
  templateUrl: './neo.component.html',
  styles: [],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NeoComponent implements OnInit {
  @Input() neo: INEO;
  pendingNickname: string;

  constructor(private data: DataService) { }

  ngOnInit() {
  }

  getHazardText(hazardous: boolean): string {
    return !hazardous ?
      'No extinction-level event' :
      'Potentially hazardous!';
  }

  onSubmitNickname(event: INEO) {
    this.pendingNickname = '';
    this.data.update$(event).subscribe(
      neo => {
        this.pendingNickname = '';
        console.log('Successfully updated nickname!', neo);
      },
      err => {
        this.pendingNickname = event.nickname;
        console.error(err);
      }
    );
  }

}
