import { Component, OnInit, ViewChild } from '@angular/core';
import { DataService } from './data/apod-data.service';
import { fromEvent, interval, merge } from 'rxjs';
import { switchMap, takeUntil } from 'rxjs/operators';
import { IUPDATE } from './data/apod.model';

@Component({
  selector: 'apod-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  @ViewChild('starBtn', { static: false }) starBtn;

  constructor(public data: DataService) { }

  ngOnInit() {
    this.data.apodData$().subscribe(
      () => this.setupStars()
    );
  }

  private setupStars() {
    const counter: IUPDATE = { stars: 0 };
    const addStar = () => {
      counter.stars++;
      this.data.addStars(counter);
    };
    // Click to add a single star
    const click$ = fromEvent(this.starBtn.nativeElement, 'click');
    click$.subscribe(addStar);
    // Hold mouse down to add stars continuously until mouse up or leave button
    const mousedown$ = fromEvent(this.starBtn.nativeElement, 'mousedown');
    const mouseup$ = fromEvent(this.starBtn.nativeElement, 'mouseup');
    const mouseleave$ = fromEvent(this.starBtn.nativeElement, 'mouseleave');
    const hold$ = mousedown$.pipe(
      switchMap(() => interval(200).pipe(
        takeUntil(
          merge(mouseup$, mouseleave$)
        )
      ))
    );
    hold$.subscribe(addStar);
  }
}
