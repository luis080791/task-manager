import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CenterToCenterComponent } from './center-to-center.component';

describe('CenterToCenterComponent', () => {
  let component: CenterToCenterComponent;
  let fixture: ComponentFixture<CenterToCenterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CenterToCenterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CenterToCenterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
