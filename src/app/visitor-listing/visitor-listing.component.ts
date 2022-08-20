import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Visitor } from '../app.model';
import { AppService } from '../app.service';

@Component({
  selector: 'app-visitor-listing',
  templateUrl: './visitor-listing.component.html',
  styleUrls: ['./visitor-listing.component.scss']
})
export class VisitorListingComponent implements OnInit {
  visitorList$: Observable<Visitor[]>;
  listLoading$: Observable<boolean>;
  closeModal$: Observable<boolean>;
  editVisitorInfo: any = undefined;

  constructor(private appService: AppService) {
    this.listLoading$ = this.appService.getListLoading();
    this.visitorList$ = this.appService.getVisitorList();
    this.closeModal$ = this.appService.getCloseModal().pipe(
      tap((value: boolean) => {
        if (!!value) {
          this.editVisitorInfo = undefined;
        }
      })
    );
  }

  ngOnInit() {}

  addNewVisitor() {
    this.appService.setCloseModal(false);
  }

  editExistingVisitor(visitor: Visitor) {
    this.editVisitorInfo = visitor;
    this.appService.setCloseModal(false);
  }
}
