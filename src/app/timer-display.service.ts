import { Injectable } from '@angular/core';
import { Timer } from '../app/timer.service';

/**
 * The TimerDisplay class represents a model of a digital timer display.
 * The TimerDisplay can track time in the more of hours, minutes, and seconds.
 */
class TimerDisplay {

  /** The maximum value for minutes and seconds. */
  public static readonly MAX_CLOCK_VALUE = 60;

  /** The minimum value for hours, minutes, and seconds. */
  public static readonly MIN_CLOCK_VALUE = 0;

  /** The number of hours on the timer. */
  private hours: number;

  /** The number of minutes on the timer. */
  private minutes: number;

  /** The number of seconds on the timer. */
  private seconds: number;

  /**
   * Creates a new TimerDisplay object.
   * @param hours The number of hours to display on the timer.
   * @param minutes The number of minutes to display on the timer.
   * @param seconds The number of seconds to display on the timer.
   */
  constructor(hours: number, minutes: number, seconds: number) {
    this.setHours(hours);
    this.setMinutes(minutes);
    this.setSeconds(seconds);
  }

  /** @return The number of hours that will be displayed on the timer. */
  public getHours() {
    return this.hours;
  }

  /** @return The number of minutes that will be displayed on the timer. */
  public getMinutes() {
    return this.minutes;
  }

  /** @return The number of seconds that will be display on the timer. */
  public getSeconds() {
    return this.seconds;
  }

  /** @param hours The number of hours to display on the timer. */
  public setHours(hours: number) {
    if(hours < TimerDisplay.MIN_CLOCK_VALUE) {
      this.hours = TimerDisplay.MIN_CLOCK_VALUE;

    } else {
      this.hours = hours;
    }
  }

  /** @param minutes The number of minutes to display on the timer. */
  public setMinutes(minutes: number) {
    if(minutes > TimerDisplay.MAX_CLOCK_VALUE) {
      this.minutes = TimerDisplay.MAX_CLOCK_VALUE;

    } else if(minutes < TimerDisplay.MIN_CLOCK_VALUE) {
      this.minutes = TimerDisplay.MIN_CLOCK_VALUE;

    } else {
      this.minutes = minutes;
    }
  }

  /** @param seconds The number of seconds to display on the timer. */
  public setSeconds(seconds: number) {
    if(seconds > TimerDisplay.MAX_CLOCK_VALUE) {
      this.seconds = TimerDisplay.MAX_CLOCK_VALUE;

    }
    else if(seconds < TimerDisplay.MIN_CLOCK_VALUE) {
      this.seconds = TimerDisplay.MIN_CLOCK_VALUE;

    } else {
      this.seconds = seconds;
    }
  }

}

/**
 * The TimerDisplayService class provides the functionality needed to
 * represent time in hours, minutes, and seconds on a TimerDisplayComponent.
 */
@Injectable({
  providedIn: 'root'
})
export class TimerDisplayService {

  /** A TimerDisplay object which holds time in the form of hours, minutes, and seconds. */
  private display: TimerDisplay;

  /**
   * Creates a new TimerDisplayService object.
   */
  constructor() { 
    this.display = new TimerDisplay(0, 0, 0);
  }

  /**
   * Sets the time to be displayed on the timer display.
   * @param hours The number of hours to display.
   * @param minutes The number of minutes to display.
   * @param seconds The number of seconds to display.
   */
  public setDisplayTime(hours: number, minutes: number, seconds: number) {
    this.display.setHours(hours);
    this.display.setMinutes(minutes);
    this.display.setSeconds(seconds);
  }

  /** 
   * @return A string formatted in the style of HH:MM:SS which represents the
   * time stored in the timer display.
   */
  public getDisplayString() {
    var hours = this.getHoursString();
    var minutes = this.getMinutesString();
    var seconds = this.getSecondsString();
    return String(hours + minutes + seconds);
  }

  /** @return A formatted string representing the hours stored in the timer display. */
  private getHoursString() {
    // If there are no hours on the timer than we return a 0 for display purposes.
    if(this.display.getHours() <= 0) {
      return "";

    } else {
      return String(this.display.getHours() + ":");
    }
  }

  /** @return A formatted string representing the minutes stored in the timer display. */
  private getMinutesString() {
    var minutes = this.display.getMinutes();
    var hours = this.display.getHours();

    if(minutes <= 0 && hours <= 0) {
      return "0:";

    } else if(minutes <= 9 && hours > 0) {
      return String("0" + minutes + ":");

    } else {
      return String(minutes + ":");
    }
  }

  /** @return A formatted string representing the seconds stored in the timer display. */
  private getSecondsString() {
    var seconds = this.display.getSeconds()

    // If the time is less than or equal to 9 seconds we add a leading 0 for display purposes.
    if(seconds <= 9) {
      return String("0" + seconds);

    } else {
      return String(seconds);
    }
  }

}