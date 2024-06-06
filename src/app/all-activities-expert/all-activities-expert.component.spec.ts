import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AllActivitiesExpertComponent } from './all-activities-expert.component';

describe('AllActivitiesExpertComponent', () => {
  let component: AllActivitiesExpertComponent;
  let fixture: ComponentFixture<AllActivitiesExpertComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AllActivitiesExpertComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AllActivitiesExpertComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
