import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PaketAComponent } from './paket-a.component';

describe('PaketAComponent', () => {
  let component: PaketAComponent;
  let fixture: ComponentFixture<PaketAComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PaketAComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PaketAComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('geçememesi gerekir', () => {
    expect("Naber kangi").toContain('kanki');
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
