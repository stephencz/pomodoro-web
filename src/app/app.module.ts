import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { TimerComponent } from './timer/timer.component';
import { TimerDisplayComponent } from './timer-display/timer-display.component';
import { TimerButtonComponent } from './timer-button/timer-button.component';
import { TimerInputComponent } from './timer-input/timer-input.component';
import { PipComponent } from './pip/pip.component';
import { PipManagerComponent } from './pip-manager/pip-manager.component';
import { PipDisplayComponent } from './pip-display/pip-display.component';

@NgModule({
  declarations: [
    AppComponent,
    TimerComponent,
    TimerDisplayComponent,
    TimerButtonComponent,
    TimerInputComponent,
    PipComponent,
    PipManagerComponent,
    PipDisplayComponent
  ],
  imports: [
    BrowserModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule{ 

  
}
