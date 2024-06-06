import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AllActivitiesNameComponent } from './all-activities-name.component';

describe('AllActivitiesNameComponent', () => {
  let component: AllActivitiesNameComponent;
  let fixture: ComponentFixture<AllActivitiesNameComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AllActivitiesNameComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AllActivitiesNameComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
