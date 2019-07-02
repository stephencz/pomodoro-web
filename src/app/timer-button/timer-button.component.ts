import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'timer-button',
  templateUrl: './timer-button.component.html',
  styleUrls: ['./timer-button.component.css']
})
export class TimerButtonComponent implements OnInit {

  @Input() buttonText: string;

  constructor() { 
  }

  ngOnInit() {
  }
 

  

}
