import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PsCartComponent } from './ps-cart.component';

describe('PsCartComponent', (): void => {
  let component: PsCartComponent;
  let fixture: ComponentFixture<PsCartComponent>;

  beforeEach(async (): Promise<void> => {
    await TestBed.configureTestingModule({
      imports: [PsCartComponent],
    }).compileComponents();
  });

  beforeEach((): void => {
    fixture = TestBed.createComponent(PsCartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', (): void => {
    expect(component).toBeTruthy();
  });
});
