import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserDetailsCustomerComponent } from './user-details-customer.component';

describe('UserDetailsCustomerComponent', () => {
  let component: UserDetailsCustomerComponent;
  let fixture: ComponentFixture<UserDetailsCustomerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UserDetailsCustomerComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(UserDetailsCustomerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
