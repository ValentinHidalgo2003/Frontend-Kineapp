import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PostTurnoComponent } from './post.component';

describe('PostComponent', () => {
  let component: PostTurnoComponent;
  let fixture: ComponentFixture<PostTurnoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PostTurnoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PostTurnoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
