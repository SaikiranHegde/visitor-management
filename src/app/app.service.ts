import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable, Subject } from "rxjs";
import { defaultVisitorInfo, Visitor, VisitorState } from "./app.model";
import { delay, pluck, skip, tap,  } from 'rxjs/operators';
import { append, set, lensIndex, isNil, not } from 'ramda';

const defaultState: VisitorState = {
  visitorList: [{...defaultVisitorInfo}]
}

@Injectable()
export class AppService {
  private state$ = new BehaviorSubject<VisitorState>(defaultState);
  private listLoading$ = new BehaviorSubject(false);
  private actionLoading$ = new BehaviorSubject(false);
  private closeModal$ = new BehaviorSubject(true);
  private loadListing$ = new BehaviorSubject<boolean>(true);
  private addVisitorStorage$ = new Subject<Visitor>();

  constructor() {
    this.loadListing$
    .pipe(
      skip(1),
      tap(() => this.listLoading$.next(true))
      )
    .subscribe(() => {
      this.state$.next({
        visitorList: JSON.parse(sessionStorage.getItem('visitorList') as string)
      })
      this.listLoading$.next(false);
    });

    this.addVisitorStorage$.pipe(
      tap((visitor: Visitor) => {
        const oldVisitorList = this.state$.value.visitorList;
        sessionStorage.setItem('visitorList', JSON.stringify(not(isNil(visitor.id)) ? set(lensIndex(visitor.id as number), {...visitor, inOut: true}, oldVisitorList)  : append({
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
      this.loadListing$.next(true);
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