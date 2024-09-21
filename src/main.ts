import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { bootstrapApplication } from '@angular/platform-browser';
import { AppModule } from './app/app.module';
import { AppComponent } from './app/app.component';
import { appConfig } from './app/app.config';
import { environment } from './environments/environment';

// if (environment.production) {
//   enableProdMode();
// }
//platformBrowserDynamic().
bootstrapApplication(AppComponent, appConfig)
  .catch(err => console.error(err));
