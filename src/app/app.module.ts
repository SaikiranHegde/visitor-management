import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { routes } from './app-routing';
import { AppComponent } from './app.component';
import { VisitorListingComponent } from './visitor-listing/visitor-listing.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { AppService } from './app.service';
import { RouterModule } from '@angular/router';
import { AppLoaderComponent } from './app-loader/app-loader.component';

@NgModule({
  declarations: [
    AppComponent,
    VisitorListingComponent,
    AppLoaderComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(routes),
    BrowserAnimationsModule,
    MatProgressSpinnerModule
  ],
  providers: [ AppService ],
  bootstrap: [ AppComponent ]
})
export class AppModule { }
