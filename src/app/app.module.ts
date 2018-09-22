import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, PreloadAllModules } from '@angular/router';

// Landing is our top level component
import { LandingComponent } from './views/_landing/landing.component';

/*
 * Platform and Environment providers/directives/pipes
 */
import { ROUTES } from './app.routes';
import { TableManagementComponent } from './views/table-management/table-management.component';

@NgModule({
  declarations: [
    LandingComponent,
    TableManagementComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(ROUTES, {
      useHash: Boolean(history.pushState) === false,
      preloadingStrategy: PreloadAllModules
    })
  ],
  providers: [],
  bootstrap: [LandingComponent]
})
export class AppModule { }
