import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ParsingDataComponent } from './parsing-data.component';

describe('ParsingDataComponent', () => {
  let component: ParsingDataComponent;
  let fixture: ComponentFixture<ParsingDataComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ParsingDataComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ParsingDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
