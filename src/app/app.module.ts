import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { TimerComponent } from './timer/timer.component';
import { TimerDisplayComponent } from './timer-display/timer-display.component';
import { TimerButtonComponent } from './timer-button/timer-button.component';

@NgModule({
  declarations: [
    AppComponent,
    TimerComponent,
    TimerDisplayComponent,
    TimerButtonComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule{ 

  
}
