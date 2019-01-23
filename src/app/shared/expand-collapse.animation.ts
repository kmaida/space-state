import { trigger, state, transition, style, animate } from '@angular/animations';

export const expandCollapse = trigger('expandCollapse', [
  state('*', style({ 'overflow-y': 'hidden' })),
  state('void', style({ 'overflow-y': 'hidden' })),
  transition(':enter', [
    style({
      height: 0,
      opacity: 0
    }),
    animate('250ms ease-in', style({
      height: '*',
      opacity: 1
    }))
  ]),
  transition(':leave', [
    animate('250ms ease-out', style({
      height: 0,
      opacity: 0
    }))
  ])
]);
