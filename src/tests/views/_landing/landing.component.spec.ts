import { TestBed, async } from '@angular/core/testing';
import { LandingComponent } from '../../../app/views/_landing/landing.component';

describe('AppComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        LandingComponent
      ],
    }).compileComponents();
  }));

  // it('should create the app', async(() => {
  //   const fixture = TestBed.createComponent(LandingComponent);
  //   const app = fixture.debugElement.componentInstance;
  //   expect(app).toBeTruthy();
  // }));

  // it(`should have as title 'dm-tools'`, async(() => {
  //   const fixture = TestBed.createComponent(LandingComponent);
  //   const app = fixture.debugElement.componentInstance;
  //   expect(app.title).toEqual('dm-tools');
  // }));

  // it('should render title in a h1 tag', async(() => {
  //   const fixture = TestBed.createComponent(LandingComponent);
  //   fixture.detectChanges();
  //   const compiled = fixture.debugElement.nativeElement;
  //   expect(compiled.querySelector('h1').textContent).toContain('Welcome to dm-tools!');
  // }));

});
