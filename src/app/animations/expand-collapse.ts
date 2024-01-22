import { trigger, style, transition, animate, keyframes } from '@angular/animations';

export const expandCollapse = trigger('ExpandCollapse', [
    transition(':enter', [
      animate('200ms cubic-bezier(0.25, 0.8, 0.25, 1)', keyframes([
        style({ opacity: 0, height:'0px', offset: 0 }),
        style({ opacity: 1, height: '*', offset: 1 })
      ]))
    ]),
    transition(':leave', [
      animate('200ms linear', keyframes([
        style({ opacity: 1, height:'*', offset: 0 }),
        style({ opacity: 0, height:'0px', offset: 1 })
      ]))
    ])
  ])