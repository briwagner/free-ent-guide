/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { SportsComponent } from './sports.component';
import { FormsModule } from '@angular/forms';
import { GenrePipe } from 'app/genre.pipe';
import { SportsService } from 'app/services/sports.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('SportsComponent', () => {
  let component: SportsComponent;
  let fixture: ComponentFixture<SportsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      providers: [SportsService],
      imports: [FormsModule, HttpClientTestingModule],
      declarations: [ SportsComponent, GenrePipe]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SportsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
