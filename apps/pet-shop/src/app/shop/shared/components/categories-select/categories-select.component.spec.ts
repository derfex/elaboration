import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CategoriesSelectComponent } from './categories-select.component';

describe('CategoriesSelectComponent', (): void => {
  let component: CategoriesSelectComponent;
  let fixture: ComponentFixture<CategoriesSelectComponent>;

  beforeEach(async (): Promise<void> => {
    await TestBed.configureTestingModule({
      imports: [CategoriesSelectComponent],
    }).compileComponents();
  });

  beforeEach((): void => {
    fixture = TestBed.createComponent(CategoriesSelectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', (): void => {
    expect(component).toBeTruthy();
  });
});
