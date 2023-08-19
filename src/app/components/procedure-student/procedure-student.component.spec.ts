import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProcedureStudentComponent } from './procedure-student.component';

describe('ProcedureStudentComponent', () => {
  let component: ProcedureStudentComponent;
  let fixture: ComponentFixture<ProcedureStudentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProcedureStudentComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProcedureStudentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
