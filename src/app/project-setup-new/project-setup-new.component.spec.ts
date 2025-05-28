import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectSetupNewComponent } from './project-setup-new.component';

describe('ProjectSetupNewComponent', () => {
  let component: ProjectSetupNewComponent;
  let fixture: ComponentFixture<ProjectSetupNewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProjectSetupNewComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProjectSetupNewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
