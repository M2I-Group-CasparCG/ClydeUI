import { TestBed, async } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AppComponent } from './app.component';
// import { LivePageComponent } from './live-page/live-page.component';
// import { MediaPlayerComponent } from './media-player/media-player.component';
// import { OutputMatrixComponent } from './output-matrix/output-matrix.component';
// import { ScreenConsumerFormComponent } from './settings/caspars-settings/io-config/consumers-settings/consumer-add/screen-consumer-form/screen-consumer-form.component';

describe('AppComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule
      ],
      declarations: [
        AppComponent,
      ],
    }).compileComponents();
  }));
  it('should create the app', async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  }));
  it(`should have as title 'clydeui'`, async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app.title).toEqual('clydeui');
  }));

});
