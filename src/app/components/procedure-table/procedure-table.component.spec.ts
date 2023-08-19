import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProcedureTableComponent } from './procedure-table.component';

describe('ProcedureTableComponent', () => {
  let component: ProcedureTableComponent;
  let fixture: ComponentFixture<ProcedureTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProcedureTableComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProcedureTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
