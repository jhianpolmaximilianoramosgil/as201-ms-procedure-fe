import { ComponentFixture, TestBed } from '@angular/core/testing';

import { viewRenderComponent } from './viewRender.component';

describe('LoginUserComponent', () => {
  let component: viewRenderComponent;
  let fixture: ComponentFixture<viewRenderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ viewRenderComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(viewRenderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
