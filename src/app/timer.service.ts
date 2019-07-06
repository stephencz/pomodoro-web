import { Injectable } from '@angular/core';
import { TimerDisplayComponent } from './timer-display/timer-display.component';
import { interval } from 'rxjs';

/**
 * The Timer class represents a model of a digital timer. A timer is able to
 * keep track of time in seconds. Additionally, a timer provides come convience
 * variables for tracking the the duration the timer is suppose to run, whether
 * or not the timer is or isn't running, the time the timer was started, and the
 * time the timer last ticked down.
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

  /** A convience variable for keeping track of the amount of time the timer is suppose to run. */
  private duration: number;

  /** A convience variable for keeping track of the last time something was done. */
  private last: number;

  /** A convience variable for keeping track of the time the timer was started. */
  private start: number;

  /** Creates a new Timer object. */
  constructor(time: number) {
    this.isRunning = false;
    this.time = time;
    this.duration = 0;
    this.last = 0;
    this.start = 0;
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
   * @param seconds The time in seconds.
   */
  public setTime(seconds: number) {
    this.time = seconds; 
  }

  /** @return The duration of the timer in seconds. */
  public getDuration() {
    return this.duration;
  }

  /**
   * Sets the duration of the timer in seconds. Note, duration is a convience
   * variable and setting it will not change the time on the timer.
   * @param seconds 
   */
  public setDuration(seconds: number) {
    this.duration = seconds;
  }

  /** @return The time the timer last ticked down. */
  public getLast() {
    return this.last;
  }

  /** Stores the value of Date.now() in the last variable. */
  public setLast() {
    this.last = Date.now();
  }

  /** @return Returns the time the timer started at. */
  public getStart() {
    return this.start;
  }

  /** Stores the value of Date.now() in the start variable. */
  public setStart() {
    this.start = Date.now();
  }

  /** @return The time in milliseconds since last was last set. */
  public getLastDelta() {
    return Date.now() - this.last;
  }

  /** @return The time in milliseconds since the timer was started. */
  public getStartDelta() {
    return Date.now() - this.start;
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

  /** The interval that ticks the timer down. */
  private timerInterval: any;

  /** The interval which keeps the alarm beepinmg. */
  private alarmInterval: any;

  /** The timer's alarm mp3 file. */
  private audio = new Audio('assets/beep.mp3');


  /**
   * Creates a new TimerService object.
   */
  constructor() { 
    this.timer = new Timer(0);
    this.timerInterval = undefined;
    this.alarmInterval = undefined;
  }

  /**
   * Sets the time on the timer in hours, minutes, and seconds.
   * @param hours The number of hours on the timer.
   * @param minutes The number of minutes on the timer.
   * @param seconds The number of seconds on the timer.
   */
  public setTimer(hours: number, minutes: number, seconds: number) {
    var time = this.convertHoursToSeconds(hours) + this.convertMinutesToSeconds(minutes) + seconds;
    this.timer.setDuration(time);
    this.timer.setTime(time);
  }

  /**
   * Sets the time on the timer in seconds.
   * @param seconds The number of seconds on the timer.
   */
  public setTimerBySeconds(seconds: number) {
    this.timer.setDuration(seconds);
    this.timer.setTime(seconds);
  }

  /**
   * Sets the time on the timer in minutes.
   * @param minutes The number of minutes on the timer.
   */
  public setTimerByMinutes(minutes: number) {
    var time = this.convertMinutesToSeconds(minutes);
    this.timer.setDuration(time);
    this.timer.setTime(time);
  }

  /**
   * Sets the time on the timer in hours.
   * @param hours The number of hours on the timer.
   */
  public setTimerByHours(hours: number) {
    var time = this.convertHoursToSeconds(hours);
    this.timer.setDuration(time);
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

      //Set the Timer to running.
      this.timer.setIsRunning(true);

      //Initialize the timer's start and last variable so that the correct timer time
      //can be calculated accurately.
      this.timer.setStart();
      this.timer.setLast();

      //Create the timer interval which holds the process of ticking down the time.
      this.timerInterval = setInterval(() => {

        //If the time since the last time the timer was set is greater than or equal to
        //1000ms than we tick the timer.
        if(this.timer.getLastDelta() >= 1000)
        {
          let passed = Math.floor(this.timer.getStartDelta() / 1000); //The time in seconds since starting the timer.
          this.timer.setTime(this.timer.getDuration() - passed); //Sets the time on the timer to the duration of the timer minus the time passed.
          this.syncTimerDisplay(timerDisplay); //Syncs the display with the timer.
          this.timer.setLast(); //Updates the 'last' variable.
        }
        
        //If the timer is less than or equal to zero it stops.
        if(this.timer.getTime() <= 0) {
          this.stop(timerDisplay);
        }
        
      }, 16
      );
    }
  }

  /**
   * Stops the timer.
   * @param timerDisplay The TimerDisplayComponent to clear the time from.
   */
  public stop(timerDisplay: TimerDisplayComponent) {

    //If the timer is running we clear the timer interval to stop it
    //from ticking down and then we set the isRunning flag to false.
    if(this.timer.getIsRunning()) {

      clearInterval(this.timerInterval);
      this.timerInterval = undefined;
      this.timer.setIsRunning(false);

      //If this function was called because the time was less than or equal to
      //zero than we start the alarm interval.
      if(this.timer.getTime() <= 0) {
        this.alarmInterval = setInterval(() => {
          this.beep();
        }, 1200);
      }

    } else {
      //If the timer stopped itself by reaching zero or less we need to provide
      //a way for the user to stop the alarm interval. This is clears the interval.
      clearInterval(this.alarmInterval);
      this.alarmInterval = undefined;

    }
  }

  /** Plays a single alarm beep. */
  public beep() {
    this.audio.play();
  }
  
}
