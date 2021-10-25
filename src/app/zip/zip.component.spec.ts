/* tslint:disable:no-unused-variable */
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ZipComponent } from './zip.component';
import { FormsModule } from '@angular/forms';
import { UserService } from 'app/services/user.service';
import { HttpClientModule } from '@angular/common/http';

describe('ZipComponent', () => {
  let component: ZipComponent;
  let fixture: ComponentFixture<ZipComponent>;

  beforeEach(async () => {
    TestBed.configureTestingModule({
      imports: [FormsModule, HttpClientModule],
      declarations: [ ZipComponent ],
      providers: [UserService]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ZipComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
