import {
    trigger,
    state,
    style,
    animate,
    transition,
    // ...
  } from '@angular/animations';
  

export const showHide = trigger('showHide', [
    // ...fi
    state('show', style({
      height: "480px",
      overflow: "hidden"
    //   display : "block"
    })),
    state('hide', style({
      height: '0px',
      overflow: "hidden"
    //   display : "block"
    })),
    transition('show => hide', [
      animate('0.1s')
    ]),
    transition('hide => show', [
      animate('0.1s')
    ]),
  ]);

export const appear = trigger('appear', [
    // ...
    state('ini', style({
      left : "-100%"
    })),
    state('run', style({
      left : "0%"
    })),
    transition('ini => run', [
      animate('0.2s')
    ]),
    transition('run => ini', [
      animate('0s')
    ]),
  ]);