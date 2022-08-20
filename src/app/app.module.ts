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
import { VisitorTableComponent } from './visitor-table/visitor-table.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatTableModule } from '@angular/material/table';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { ReactiveFormsModule } from '@angular/forms';
import { CreateVisitorComponent } from './create-visitor/create-visitor.component';

@NgModule({
  declarations: [
    AppComponent,
    VisitorListingComponent,
    AppLoaderComponent,
    VisitorTableComponent,
    CreateVisitorComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(routes),
    BrowserAnimationsModule,
    MatProgressSpinnerModule,
    MatButtonModule,
    MatInputModule,
    MatFormFieldModule,
    MatTableModule,
    ReactiveFormsModule
  ],
  providers: [ AppService ],
  bootstrap: [ AppComponent ]
})
export class AppModule { }
