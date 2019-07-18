import { Component, OnInit, ViewChild, ViewChildren, QueryList } from "@angular/core";
import { TimerDisplayComponent } from '../timer-display/timer-display.component';
import { TimerService } from '../timer.service';
import { TimerInputComponent } from '../timer-input/timer-input.component';

/**
 * The TimerComponent class is a component which represents a pomodoro 
 * productivity timer. Each TimerComponent has a TimerDisplay, as well
 * as several buttons which are responsible for setting the internal timer
 * on the timer.
 */
@Component({
  selector: 'timer',
  templateUrl: './timer.component.html',
  styleUrls: ['./timer.component.css']
})
export class TimerComponent implements OnInit {

  /** A reference to the TimerDisplayComponent object attached to this timer. */
  @ViewChild(TimerDisplayComponent, {static: true}) timerDisplay: TimerDisplayComponent;

  @ViewChild(TimerInputComponent, {static: true}) timerInput: TimerInputComponent;

  constructor(private timerService: TimerService) { }

  ngOnInit() {
    this.timerService.setTimerByMinutes(25);
    this.timerService.syncTimerDisplay(this.timerDisplay);
  }
  
  /** Starts the timer. */
  start() {
    this.timerService.start(this.timerDisplay);
  }

  /** Stops the timer. */
  stop() {
    this.timerService.stop(this.timerDisplay);
  }

  /** Sets the timer for one pomodoro (25 minutes). */
  setTimerForPomodoro() {
    this.stop()
    this.timerService.setTimerByMinutes(25);
    this.timerService.syncTimerDisplay(this.timerDisplay);
  }

  /** Sets the timer for a long break (15 minutes). */
  setTimerForLongBreak() {
    this.stop()
    this.timerService.setTimerByMinutes(15);
    this.timerService.syncTimerDisplay(this.timerDisplay);
  }

  /** Sets the timer for a short break (5 minutes). */
  setTimerForShortBreak() {
    this.stop()
    this.timerService.setTimerByMinutes(5);
    this.timerService.syncTimerDisplay(this.timerDisplay);
  }

  /** Sets the timer for a custom time. */
  setTimerForCustom() {
    this.stop();

    var customTime = this.timerInput.customTime;

    //Get hours in minutes and minutes left in hour
    var hours = Math.floor(customTime / 60);
    var minutes = Math.floor(customTime % 60);

    this.timerService.setTimer(hours, minutes, 0);
    this.timerService.syncTimerDisplay(this.timerDisplay);
  }

}