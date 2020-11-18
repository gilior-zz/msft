import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {HttpService} from "../../services/http.service";
import {Store} from "@ngrx/store";
import {Created} from "../../store/reducer";
import {update_templates} from "../../store/actions";
import {MatTableDataSource} from "@angular/material/table";
import {Value} from "../../models/template-response";
import {FieldBase} from "../../models/FieldBase";
import {FieldService} from "../../services/field.service";

@Component({
    selector: 'msft-edit',
    templateUrl: './edit.component.html',
    styleUrls: ['./edit.component.scss']
})
export class EditComponent implements OnInit {
    template: Value;
    fields: FieldBase<any>[];
    dataSource: MatTableDataSource<Value>;
    displayedColumns = ['name', 'type', 'kind'];
    private template_id: string;

    constructor(private httpService: HttpService, private store: Store<Created>, private  activatedRoute: ActivatedRoute, private  fieldService: FieldService) {
    }

    ngOnInit(): void {
        this.httpService.get_templates()
            .subscribe(
                (data) => {
                    this.store.dispatch(update_templates({templates: data.value}));
                }
            )

        this.store.select(a => a.templates)
            .subscribe(
                (data) => {
                    this.template = data.find(i => i.name == this.template_id);
                    if (this.template) {
                        this.fields = this.fieldService.getFields(this.template);
                        this.dataSource = new MatTableDataSource([this.template]);

                    }
                }
            )

        this.activatedRoute.paramMap.subscribe(
            (param) => {
                this.template_id = param.get('id');
            })
    }

}
