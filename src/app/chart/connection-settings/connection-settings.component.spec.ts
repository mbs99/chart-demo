import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConnectionSettingsComponent } from './connection-settings.component';

describe('ConnectionSettingsComponent', () => {
  let component: ConnectionSettingsComponent;
  let fixture: ComponentFixture<ConnectionSettingsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConnectionSettingsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ConnectionSettingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
