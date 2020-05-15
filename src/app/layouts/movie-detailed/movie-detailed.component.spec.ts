import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MovieDetailedComponent } from './movie-detailed.component';

describe('MovieDetailedComponent', () => {
  let component: MovieDetailedComponent;
  let fixture: ComponentFixture<MovieDetailedComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MovieDetailedComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MovieDetailedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
