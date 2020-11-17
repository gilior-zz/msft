import {Component, Input, OnInit} from '@angular/core';
import {FieldBase} from "../../models/FieldBase";
import {FormGroup} from "@angular/forms";

@Component({
  selector: 'msft-dynamic-form-field',
  templateUrl: './dynamic-form-field.component.html',
  styleUrls: ['./dynamic-form-field.component.scss']
})
export class DynamicFormFieldComponent implements OnInit {
  @Input() field: FieldBase<string>;
  @Input() form: FormGroup;
  get isValid() { return this.form.controls[this.field.key].valid; }
  constructor() { }

  ngOnInit(): void {
  }

}
