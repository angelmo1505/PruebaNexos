import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { GenerateqrPage } from './generateqr.page';

describe('GenerateqrPage', () => {
  let component: GenerateqrPage;
  let fixture: ComponentFixture<GenerateqrPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GenerateqrPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(GenerateqrPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
