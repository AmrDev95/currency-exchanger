import { animate, keyframes, state, style, transition, trigger } from "@angular/animations";

export const slidingAnimation = trigger('SlidingAnimation', [
  transition(':enter', [
    animate('200ms cubic-bezier(0.25, 0.8, 0.25, 1)', keyframes([
      style({ opacity: 0, width:'0px', offset: 0 }),
      style({ opacity: 1, width: '*', offset: 1 })
    ]))
  ]),
  transition(':leave', [
    animate('200ms linear', keyframes([
      style({ opacity: 1, width:'*', offset: 0 }),
      style({ opacity: 0, width:'0px', offset: 1 })
    ]))
  ])
])