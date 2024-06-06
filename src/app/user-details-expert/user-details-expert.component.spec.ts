import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserDetailsExpertComponent } from './user-details-expert.component';

describe('UserDetailsExpertComponent', () => {
  let component: UserDetailsExpertComponent;
  let fixture: ComponentFixture<UserDetailsExpertComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UserDetailsExpertComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(UserDetailsExpertComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
