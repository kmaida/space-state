import { trigger, transition, style, animate } from '@angular/animations';

export const toast = trigger('toast', [
  transition(':enter', [
    style({
      opacity: 0,
      transform: 'translateY(30px)'
    }),
    animate('300ms ease-in', style({
      opacity: 1,
      transform: 'translateY(0)'
    }))
  ]),
  transition(':leave', [
    animate('300ms ease-out', style({
      opacity: 0,
      transform: 'translateY(30px)'
    }))
  ])
]);
