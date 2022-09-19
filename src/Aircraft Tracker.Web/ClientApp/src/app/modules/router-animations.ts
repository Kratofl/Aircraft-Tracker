import {
  trigger,
  transition,
  style,
  query,
  group,
  animateChild,
  animate,
  keyframes,
} from "@angular/animations";

export const fade =
  trigger('routeAnimations', [
    transition('* => *', [
      query(':enter', [style({ opacity: 0, position: 'absolute', left: "0", width: "100%" })], {
        optional: true,
      }),
      query(
        ':leave',
        [
          style({ opacity: 1 }),
          animate('0.4s', style({ opacity: 0, position: 'absolute', left: "0", width: "100%" })),
        ],
        { optional: true }
      ),
      query(
        ':enter',
        [
          style({ opacity: 0 }),
          animate('0.4s', style({ opacity: 1, position: 'relative' })),
        ],
        { optional: true }
      ),
    ]),
  ]);
