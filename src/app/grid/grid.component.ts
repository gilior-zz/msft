import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTable, MatTableDataSource} from '@angular/material/table';
import {Value} from "../../models/template-response";
import {HttpService} from "../../services/http.service";
import {Store} from "@ngrx/store";
import {Created, TemplatesStore} from '../../store/reducer'
import {update_templates} from "../../store/actions";
import {animate, state, style, transition, trigger} from "@angular/animations";
import {SelectionModel} from "@angular/cdk/collections";
import {ActivatedRoute, Router} from "@angular/router";
import {MatDialog} from "@angular/material/dialog";
import {DialogComponent} from "../dialog/dialog.component";

@Component({
    selector: 'msft-grid',
    templateUrl: 'grid.component.html',
    styleUrls: ['grid.component.scss'],
    animations: [
        trigger('detailExpand', [
            state('collapsed', style({height: '0px', minHeight: '0'})),
            state('expanded', style({height: '*'})),
            transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)'))
        ]),
    ],
})
export class GridComponent implements AfterViewInit, OnInit {

    expandedElement: Value | null;
    dataSource: MatTableDataSource<Value>
    displayedColumns = ['select', 'id', 'name', 'type', 'kind', 'actions'];
    selection = new SelectionModel<Value>(true, []);

    constructor(private httpService: HttpService, private store: Store<Created>, private router: Router, private  activatedRoute: ActivatedRoute, public dialog: MatDialog) {
    }

    ngOnInit() {
        this.httpService.get_templates()
            .subscribe(
                (data) => {
                    this.store.dispatch(update_templates({templates: data.value}));
                }
            )

        this.store.select(a => a.templates)
            .subscribe(
                (data) => {
                    this.dataSource = new MatTableDataSource(data);
                }
            )

    }

    /** Whether the number of selected elements matches the total number of rows. */
    isAllSelected() {
        const numSelected = this.selection.selected.length;
        const numRows = this.dataSource.data.length;
        return numSelected === numRows;
    }

    /** Selects all rows if they are not all selected; otherwise clear selection. */
    masterToggle() {
        this.isAllSelected() ?
            this.selection.clear() :
            this.dataSource.data.forEach(row => this.selection.select(row));
    }

    /** The label for the checkbox on the passed row */
    checkboxLabel(row?: Value): string {
        if (!row) {
            return `${this.isAllSelected() ? 'select' : 'deselect'} all`;
        }
        return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.id + 1}`;
    }

    ngAfterViewInit() {

    }

    onEdit(name: string = null) {
        name = name || this.selection.selected[0].name
        this.router.navigate(['/templates', name]);
    }

    onDeploy(name: string = null) {
        let items = null;
        if (name)
            items = this.dataSource.data.find(i => i.name == name);
        else
            items = this.selection.selected;
        this.httpService.deploy_templates(items)
            .subscribe((res) => {
                this.dialog.open(DialogComponent, {
                    data: {...res}
                });
            })
    }

}
