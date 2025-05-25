import { ComponentFixture, TestBed } from '@angular/core/testing';
import { EmptinessComponent } from './emptiness.component';

describe('EmptinessComponent', (): void => {
  let component: EmptinessComponent;
  let fixture: ComponentFixture<EmptinessComponent>;

  beforeEach(async (): Promise<void> => {
    await TestBed.configureTestingModule({
      imports: [EmptinessComponent],
    }).compileComponents();
  });

  beforeEach((): void => {
    fixture = TestBed.createComponent(EmptinessComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', (): void => {
    expect(component).toBeTruthy();
  });
});
