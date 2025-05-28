import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ModelRecipeComponent } from './model-recipe.component';

describe('ModelRecipeComponent', () => {
  let component: ModelRecipeComponent;
  let fixture: ComponentFixture<ModelRecipeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ModelRecipeComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(ModelRecipeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});