import { TestBed } from '@angular/core/testing';

import { TimerDisplayService } from './timer-display.service';

describe('TimerDisplayService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: TimerDisplayService = TestBed.get(TimerDisplayService);
    expect(service).toBeTruthy();
  });
});
