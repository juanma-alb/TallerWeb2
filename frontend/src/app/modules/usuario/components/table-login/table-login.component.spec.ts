import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TableLoginComponent } from './table-login.component';

describe('TableLoginComponent', () => {
  let component: TableLoginComponent;
  let fixture: ComponentFixture<TableLoginComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TableLoginComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TableLoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
