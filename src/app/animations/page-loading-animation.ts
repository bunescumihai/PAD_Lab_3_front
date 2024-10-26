import {animate, state, style, transition, trigger} from "@angular/animations";

export const pageLoadingAnimation = [
  trigger('pageLoadingAnimation', [
    state('void', style({
      opacity: 0
    })),
    state('*', style({
      opacity: 1
    })),
    transition(':enter', [
      animate('300ms')
    ])
  ])
]
