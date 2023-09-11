import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BarchartsectorComponent } from './barchartsector.component';

describe('BarchartsectorComponent', () => {
  let component: BarchartsectorComponent;
  let fixture: ComponentFixture<BarchartsectorComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BarchartsectorComponent]
    });
    fixture = TestBed.createComponent(BarchartsectorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
