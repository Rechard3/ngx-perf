import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NgxPerfComponent } from './ngx-perf.component';

describe('NgxPerfComponent', () => {
  let component: NgxPerfComponent;
  let fixture: ComponentFixture<NgxPerfComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NgxPerfComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NgxPerfComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
