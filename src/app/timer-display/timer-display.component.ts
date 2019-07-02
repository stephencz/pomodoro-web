import { Component, OnInit, Input } from '@angular/core';
import { TimerDisplayService } from '../timer-display.service';

@Component({
  selector: 'timer-display',
  templateUrl: './timer-display.component.html',
  styleUrls: ['./timer-display.component.css']
})
export class TimerDisplayComponent implements OnInit {

  private display: string;

  constructor(private timerDisplayService: TimerDisplayService) { 
    
  }

  ngOnInit() {
  }

  public updateDisplay(hours: number, minutes: number, seconds: number) {
    this.timerDisplayService.setDisplayTime(hours, minutes, seconds);
    this.display = this.timerDisplayService.getDisplayString();
  }

}
