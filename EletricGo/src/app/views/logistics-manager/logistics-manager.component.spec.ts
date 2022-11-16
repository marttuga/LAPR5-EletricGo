import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LogisticsManagerComponent } from './logistics-manager.component';

describe('LogisticsManagerComponent', () => {
  let component: LogisticsManagerComponent;
  let fixture: ComponentFixture<LogisticsManagerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LogisticsManagerComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LogisticsManagerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
