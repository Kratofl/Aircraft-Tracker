import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TrackerMapComponent } from './tracker-map.component';

describe('TrackerMapComponent', () => {
  let component: TrackerMapComponent;
  let fixture: ComponentFixture<TrackerMapComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TrackerMapComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TrackerMapComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
