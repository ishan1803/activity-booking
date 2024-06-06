import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BookingsByCustomerComponent } from './bookings-by-customer.component';

describe('BookingsByCustomerComponent', () => {
  let component: BookingsByCustomerComponent;
  let fixture: ComponentFixture<BookingsByCustomerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BookingsByCustomerComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(BookingsByCustomerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
