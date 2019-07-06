import { Component, OnInit, Input } from '@angular/core';

/**
 * The TimerButtonComponenet class is a component which
 * acts as a button.
 */
@Component({
  selector: 'timer-button',
  templateUrl: './timer-button.component.html',
  styleUrls: ['./timer-button.component.css']
})
export class TimerButtonComponent {

  /** The text the button displays. */
  @Input() buttonText: string;

  constructor() { }
  
}
