import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PipManagerComponent } from './pip-manager.component';

describe('PipManagerComponent', () => {
  let component: PipManagerComponent;
  let fixture: ComponentFixture<PipManagerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PipManagerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PipManagerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
