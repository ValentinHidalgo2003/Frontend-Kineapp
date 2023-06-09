import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GetTurnoComponent } from './get.component';

describe('GetComponent', () => {
  let component: GetTurnoComponent;
  let fixture: ComponentFixture<GetTurnoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GetTurnoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GetTurnoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
