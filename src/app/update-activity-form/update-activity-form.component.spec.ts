import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateActivityFormComponent } from './update-activity-form.component';

describe('UpdateActivityFormComponent', () => {
  let component: UpdateActivityFormComponent;
  let fixture: ComponentFixture<UpdateActivityFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UpdateActivityFormComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(UpdateActivityFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
