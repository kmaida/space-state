import { Component, OnInit, ViewChild } from '@angular/core';
import { DataService } from './data/apod-data.service';
import { fromEvent, interval, merge } from 'rxjs';
import { switchMap, takeUntil } from 'rxjs/operators';

@Component({
  selector: 'apod-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  @ViewChild('starBtn') starBtn;
  count = 0;

  constructor(public data: DataService) { }

  ngOnInit() {
    this.data.init$().subscribe(
      apod => this.setupStars()
    );
  }

  setupStars() {
    const click$ = fromEvent(this.starBtn.nativeElement, 'click');
    const mousedown$ = fromEvent(this.starBtn.nativeElement, 'mousedown');
    const mouseup$ = fromEvent(this.starBtn.nativeElement, 'mouseup');
    const mouseleave$ = fromEvent(this.starBtn.nativeElement, 'mouseleave');

    const observer = () => {
      this.count++;
    };

    click$.subscribe(observer);
    const notifier = merge(mouseup$, mouseleave$);
    const final = mousedown$.pipe(
      switchMap(e => interval(300).pipe(takeUntil(notifier)))
    ).subscribe(observer);
  }
}
