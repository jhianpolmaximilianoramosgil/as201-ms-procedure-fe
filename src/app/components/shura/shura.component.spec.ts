import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShuraComponent } from './shura.component';

describe('LoginUserComponent', () => {
  let component: ShuraComponent;
  let fixture: ComponentFixture<ShuraComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ShuraComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ShuraComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
