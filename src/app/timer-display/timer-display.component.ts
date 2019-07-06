import { Component, OnInit, Input } from '@angular/core';
import { TimerDisplayService } from '../timer-display.service';

/**
 * The TimerDisplayComponent is used to how a time in hours, minutes, and seconds
 * on the screen.
 */
@Component({
  selector: 'timer-display',
  templateUrl: './timer-display.component.html',
  styleUrls: ['./timer-display.component.css']
})
export class TimerDisplayComponent {

  /** The string that holds the timer display's time. */
  display: string;

  constructor(private timerDisplayService: TimerDisplayService) { }

  /**
   * Updates the display with the time passed in hours, minutes, and seconds
   * @param hours The number of hours to show on the display.
   * @param minutes The number of minutes to show on the display.
   * @param seconds The number of seconds to show on the display.
   */
  public updateDisplay(hours: number, minutes: number, seconds: number) {
    this.timerDisplayService.setDisplayTime(hours, minutes, seconds);
    this.display = this.timerDisplayService.getDisplayString();
  }

}
