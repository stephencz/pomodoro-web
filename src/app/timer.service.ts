import { Injectable } from '@angular/core';
import { TimerDisplayComponent } from './timer-display/timer-display.component';
import { interval } from 'rxjs';

/**
 * The Timer class represents a model of a digital timer. A timer is able to
 * keep track of time in seconds and whether or not the timer is currently
 * running. Additionaly, there are convience variables and functions for storing
 *  a recorded time and the delta time (the elapsed time since that recorded time).
 */
export class Timer {

  /** The maximum value for minutes and seconds. */
  public static readonly MAX_CLOCK_VALUE = 60;

  /** The minimum value for hours, minutes, and seconds. */
  public static readonly MIN_CLOCK_VALUE = 0;

  /** Whether or not the timer is running. */
  private isRunning: boolean;

  /** The time in seconds. */
  private time: number;

  /** A convience variable for keeping track of previous time checks. */
  private last: number;
  
  /** The difference between the last recorded time and the current time. */
  private delta: number;

  constructor(time: number) {
    this.isRunning = false;
    this.time = time;
    this.last = 0;
    this.delta = 0;
  }

  /** @return True if the timer is running. Otherwise false. */
  public getIsRunning() {
    return this.isRunning;
  }

  /**
   * True when the timer is running. False when it is not.
   * @param running Whether or not the timer should be considered running.
   */
  public setIsRunning(running: boolean) {
    this.isRunning = running;
  }

  /** @return The time, in seconds, on the timer. */
  public getTime() {
    return this.time;
  }

  /**
   * Sets the time, in seconds, on the timer.
   * @param time The time in seconds.
   */
  public setTime(time: number) {
    this.time = time; 
  }

  /** @return Returns the last recorded time. Used when calculating the delta time. */
  public getLast() {
    return this.last;
  }

  /** Stores the value of Date.now() in the last variable. */
  public recordLast() {
    this.last = Date.now();
  }

  /** @return Returns delta time, or the time in between the last recorded time and now. */
  public getDelta() {
    this.delta = Date.now() - this.last;
    return this.delta;
  }

}

/**
 * The TimerService object provides the functionality to set, start, stop,
 * and reset a timer.
 */
@Injectable({
  providedIn: 'root'
})
export class TimerService {

  /** A Timer object. */
  private timer: Timer;

  private interval: any;

  /**
   * Creates anew TimerService object.
   */
  constructor() { 
    this.timer = new Timer(0);
    this.interval = undefined;
  }


  /**
   * Sets the time on the timer in hours, minutes, and seconds.
   * @param hours The number of hours on the timer.
   * @param minutes The number of minutes on the timer.
   * @param seconds The number of seconds on the timer.
   */
  public setTimer(hours: number, minutes: number, seconds: number) {
    var time = this.convertHoursToSeconds(hours) + this.convertMinutesToSeconds(minutes) + seconds;
    this.timer.setTime(time);
  }

  /**
   * Sets the time on the timer in seconds.
   * @param seconds The number of seconds on the timer.
   */
  public setTimerBySeconds(seconds: number) {
    this.timer.setTime(seconds);
  }

  /**
   * Sets the time on the timer in minutes.
   * @param minutes The number of minutes on the timer.
   */
  public setTimerByMinutes(minutes: number) {
    var time = this.convertMinutesToSeconds(minutes);
    this.timer.setTime(time);
  }

  /**
   * Sets the time on the timer in hours.
   * @param hours The number of hours on the timer.
   */
  public setTimerByHours(hours: number) {
    var time = this.convertHoursToSeconds(hours);
    this.timer.setTime(time);
  }

  /** @return The number of seconds remaining in the current minute. */
  public getSecondsInMinute() {
    return this.timer.getTime() % Timer.MAX_CLOCK_VALUE;
  }

  /** @return The number of minutes remaining in the current hours. */
  public getMinutesInHour() {
    return Math.floor((this.timer.getTime() / Timer.MAX_CLOCK_VALUE) % Timer.MAX_CLOCK_VALUE);
  }

  /** @return The number of hours on the timer. */
  public getHoursOnTimer() {
    return Math.floor((this.timer.getTime() / Timer.MAX_CLOCK_VALUE) / Timer.MAX_CLOCK_VALUE);
  }

  /** @return The number of seconds in the passed in number of minutes. */
  public convertMinutesToSeconds(minutes: number) {
    return minutes * Timer.MAX_CLOCK_VALUE;
  }

  /** @return The number of seconds in the passed in number of hours. */
  public convertHoursToSeconds(hours: number) {
    return (hours * Timer.MAX_CLOCK_VALUE) * Timer.MAX_CLOCK_VALUE;
  }

    /**
   * Syncs the time displayed by a TimerDisplayComponent with the Timer's time.
   * @param display A TimerDisplayComponent.
   */
  public syncTimerDisplay(display: TimerDisplayComponent)
  {
    var hours = this.getHoursOnTimer();
    var minutes = this.getMinutesInHour();
    var seconds = this.getSecondsInMinute();
  
    display.updateDisplay(hours, minutes, seconds);
  }

  /**
   * Starts the timer and keeps the connected TimerDisplayComponent updated.
   * @param timerDisplay The TimerDisplayComponent to show the time on.
   */
  public start(timerDisplay: TimerDisplayComponent) {

    //If the timer is not running, then start an an interval timer
    //which compares dates, ticks down the time, and syncs the display.
    if(!this.timer.getIsRunning()) 
    {

      //Initialize the timer's last variable so that delta time can be calculated.
      this.timer.recordLast();

      this.interval = setInterval(() => {

        //If the delta time (current time - last time) is greater than or equal to
        //1000ms, then we deincrement the time on the timer by a second. 
        if(this.timer.getDelta() >= 1000) {
          this.timer.setTime(this.timer.getTime() - 1);
          this.syncTimerDisplay(timerDisplay);
          this.timer.recordLast();

          //If the timer is less than or equal to zero it stops.
          if(this.timer.getTime() <= 0) {
            this.stop(timerDisplay);
          }

        }
      }, 16);
    }
  }

  /**
   * Stops the timer.
   * @param timerDisplay The TimerDisplayComponent to clear the time from.
   */
  public stop(timerDisplay: TimerDisplayComponent) {
    this.timer.setIsRunning(false);

    clearInterval(this.interval);
    this.interval = undefined;
  }
}
