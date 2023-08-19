import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogCareerComponent } from './dialog-career.component';

describe('DialogCareerComponent', () => {
  let component: DialogCareerComponent;
  let fixture: ComponentFixture<DialogCareerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogCareerComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DialogCareerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
