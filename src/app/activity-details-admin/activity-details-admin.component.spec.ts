import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActivityDetailsAdminComponent } from './activity-details-admin.component';

describe('ActivityDetailsAdminComponent', () => {
  let component: ActivityDetailsAdminComponent;
  let fixture: ComponentFixture<ActivityDetailsAdminComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ActivityDetailsAdminComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ActivityDetailsAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
