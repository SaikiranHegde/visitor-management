import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { AppService } from '../app.service';

@Component({
  selector: 'app-visitor-listing',
  templateUrl: './visitor-listing.component.html',
  styleUrls: ['./visitor-listing.component.scss']
})
export class VisitorListingComponent implements OnInit {
  listLoading$ = new Observable<boolean>();

  constructor(private appService: AppService) {
    this.listLoading$ = this.appService.getListLoading();
   }

  ngOnInit() {
  }
}
