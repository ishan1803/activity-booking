import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActivityDetailsExpertComponent } from './activity-details-expert.component';

describe('ActivityDetailsExpertComponent', () => {
  let component: ActivityDetailsExpertComponent;
  let fixture: ComponentFixture<ActivityDetailsExpertComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ActivityDetailsExpertComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ActivityDetailsExpertComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
