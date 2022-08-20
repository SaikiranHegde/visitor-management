import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable, Subject } from "rxjs";
import { defaultVisitorInfo, Visitor, VisitorState } from "./app.model";
import { delay, pluck, tap } from 'rxjs/operators';
import { append } from 'ramda';

const defaultState: VisitorState = {
  visitorList: [{...defaultVisitorInfo}]
}

@Injectable()
export class AppService {
  private state$ = new BehaviorSubject<VisitorState>(defaultState);
  private listLoading$ = new BehaviorSubject(true);
  private actionLoading$ = new BehaviorSubject(true);
  private closeModal$ = new BehaviorSubject(true);
  private loadListing$ = new Subject<boolean>();
  private addVisitorStorage$ = new Subject<Visitor>();

  constructor() {
    this.loadListing$
    .pipe(tap(() => this.listLoading$.next(true)))
    .subscribe(() => {
      this.state$.next({
        visitorList: JSON.parse(sessionStorage.getItem('visitorList') as string)
      })
      this.listLoading$.next(false);
    });

    this.addVisitorStorage$.pipe(
      tap((visitor: Visitor) => {
        const oldVisitorList = this.state$.value.visitorList;
        sessionStorage.setItem('visitorList', JSON.stringify(append({
          ...visitor,
          id: oldVisitorList.length,
          inOut: true
        }, oldVisitorList)));
      }),
      delay(1000),
      tap(() => {
        this.actionLoading$.next(false);
      })
    )
    .subscribe(() => {
      this.closeModal$.next(true);
      this.listLoading$.next(true);
    });
  }

  getListLoading(): Observable<boolean> {
    return this.listLoading$.asObservable();
  }

  getActionLoading (): Observable<boolean> {
    return this.actionLoading$.asObservable();
  }

  getCloseModal(): Observable<boolean> {
    return this.closeModal$.asObservable();
  }

  setCloseModal(value: boolean) {
    this.closeModal$.next(value);
  }

  getVisitorList(): Observable<Visitor[]> {
    return this.state$.pipe(pluck('visitorList'));
  }

  addVisitor(visitor: Visitor) {
    this.actionLoading$.next(true);
    this.addVisitorStorage$.next(visitor);
  }
}