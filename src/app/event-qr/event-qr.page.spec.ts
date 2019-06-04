import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EventQRPage } from './event-qr.page';

describe('EventQRPage', () => {
  let component: EventQRPage;
  let fixture: ComponentFixture<EventQRPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EventQRPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EventQRPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
