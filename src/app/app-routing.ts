import { Routes } from '@angular/router';
import { VisitorListingComponent } from './visitor-listing/visitor-listing.component';

export const routes: Routes = [
  {
    path: 'visitor-management',
    component: VisitorListingComponent
  },
  {
    path: '',
    redirectTo: 'visitor-management',
    pathMatch: 'full',
  }
];
