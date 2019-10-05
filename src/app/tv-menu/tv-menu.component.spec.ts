import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TvMenuComponent } from './tv-menu.component';

describe('TvMenuComponent', () => {
  let component: TvMenuComponent;
  let fixture: ComponentFixture<TvMenuComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TvMenuComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TvMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
