import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UndergradsComponent } from './undergrads.component';

describe('UndergradsComponent', () => {
  let component: UndergradsComponent;
  let fixture: ComponentFixture<UndergradsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [UndergradsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UndergradsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
