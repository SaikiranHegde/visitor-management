import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Visitor } from '../app.model';
import { isNil, not } from 'ramda';
import { AppService } from '../app.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-create-visitor',
  templateUrl: './create-visitor.component.html',
  styleUrls: ['./create-visitor.component.scss']
})
export class CreateVisitorComponent implements OnInit {
  @Input() visitor!: Visitor;
  createVisitorForm!: FormGroup;
  actionLoading$: Observable<boolean>;

  constructor(private builder: FormBuilder, private appService: AppService) {
    this.actionLoading$ = appService.getActionLoading();
  }

  nullCheck(visitor: Visitor): boolean {
    return not(isNil(visitor));
  }

  closeModal() {
    this.appService.setCloseModal(true);
  }

  ngOnInit() {
    const visitorInfo: Visitor = this.nullCheck(this.visitor) ? this.visitor : ({} as Visitor);
    this.createVisitorForm = this.builder.group({
      name: new FormControl(visitorInfo.name, [Validators.required, Validators.minLength(3)]),
      email: new FormControl(visitorInfo.email, [Validators.required, Validators.email]),
      cellPhone: new FormControl(visitorInfo.cellPhone, [Validators.required, Validators.pattern("^[0-9]+$"), Validators.minLength(10), Validators.maxLength(10)]),
      addressLine1: new FormControl(visitorInfo.addressLine1, [Validators.required]),
      addressLine2: new FormControl(visitorInfo.addressLine2, [Validators.required]),
      addressLine3: new FormControl(visitorInfo.addressLine3, [Validators.required]),
      city: new FormControl(visitorInfo.city, [Validators.required]),
      id: new FormControl(visitorInfo.id)
    });
  }

  visitorAction() {
    this.appService.addVisitor(this.createVisitorForm.value);
  }
}
