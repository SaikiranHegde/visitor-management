import { Component, EventEmitter, Input, OnChanges, OnInit, Output } from '@angular/core';
import { Visitor } from '../app.model';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-visitor-table',
  templateUrl: './visitor-table.component.html',
  styleUrls: ['./visitor-table.component.scss']
})
export class VisitorTableComponent implements OnChanges {
  @Input() visitorList: any;
  @Output() addNewVisitor = new EventEmitter();
  @Output() editExistingVisitor = new EventEmitter<Visitor>();
  dataSource: any;

  displayedColumns: string[] = ['id', 'name', 'cellPhone', 'email', 'city', 'actions'];

  ngOnChanges() {
    this.dataSource = new MatTableDataSource(this.visitorList);
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  editVisitor(event: Visitor) {
    this.editExistingVisitor.emit(event);
  }

  updateInOut(event: Visitor) {
    event.inOut = !event.inOut;
  }
}
