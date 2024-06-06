import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AllActivitiesLocationComponent } from './all-activities-location.component';

describe('AllActivitiesLocationComponent', () => {
  let component: AllActivitiesLocationComponent;
  let fixture: ComponentFixture<AllActivitiesLocationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AllActivitiesLocationComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AllActivitiesLocationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
