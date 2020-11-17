import {Component, Input, OnInit} from '@angular/core';
import {FormGroup} from "@angular/forms";
import {FieldControlService} from "../../services/field-control.service";
import {FieldBase} from "../../models/FieldBase";
import {DialogComponent} from "../dialog/dialog.component";
import {MatDialog} from "@angular/material/dialog";



@Component({
  selector: 'msft-dynamic-form',
  templateUrl: './dynamic-form.component.html',
  styleUrls: ['./dynamic-form.component.scss']
})
export class DynamicFormComponent implements OnInit {
  @Input() fields: FieldBase<string>[] = [];
  form: FormGroup;
  payLoad = '';

  constructor(private qcs: FieldControlService,public dialog: MatDialog) { }

  ngOnInit(): void {
    this.form = this.qcs.toFormGroup(this.fields);
  }

  onSubmit() {
    const status="Saved Successfully"
    this.dialog.open(DialogComponent, {
      data: {status}
    });
  }


}
