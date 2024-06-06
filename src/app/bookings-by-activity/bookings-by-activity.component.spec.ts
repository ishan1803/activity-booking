import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BookingsByActivityComponent } from './bookings-by-activity.component';

describe('BookingsByActivityComponent', () => {
  let component: BookingsByActivityComponent;
  let fixture: ComponentFixture<BookingsByActivityComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BookingsByActivityComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(BookingsByActivityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
