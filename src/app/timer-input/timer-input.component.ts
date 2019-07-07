import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'timer-input',
  templateUrl: './timer-input.component.html',
  styleUrls: ['./timer-input.component.css']
})
export class TimerInputComponent {

  customTime: number;

  @Output() customTimeSubmitted: EventEmitter<number> = new EventEmitter<number>();

  constructor() { }

  submitCustomTime() {
    if(!isNaN(this.customTime)) {
      this.customTimeSubmitted.emit(this.customTime);
    }
  }

}
