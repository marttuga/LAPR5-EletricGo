import { HttpClientTestingModule } from '@angular/common/http/testing';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { NgxPaginationModule } from 'ngx-pagination';

import { ChooseTruckAndRouteComponent } from './choose-truck-and-route.component';

describe('ChooseTruckAndRouteComponent', () => {
  let component: ChooseTruckAndRouteComponent;
  let fixture: ComponentFixture<ChooseTruckAndRouteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChooseTruckAndRouteComponent ],
      imports:[HttpClientTestingModule,FormsModule,RouterTestingModule,NgxPaginationModule],
      schemas: [ CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA ],
    })
    .compileComponents();

    fixture = TestBed.createComponent(ChooseTruckAndRouteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
