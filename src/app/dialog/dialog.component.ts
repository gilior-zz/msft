import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA} from "@angular/material/dialog";
import {IRes} from "../../models/update-response";
import {Value} from "../../models/template-response";

@Component({
    selector: 'msft-dialog',
    templateUrl: './dialog.component.html',
    styleUrls: ['./dialog.component.scss']
})
export class DialogComponent implements OnInit {


    constructor(@Inject(MAT_DIALOG_DATA) public content: IRes | { msg: string }) {
    }

    ngOnInit(): void {
    }

}
