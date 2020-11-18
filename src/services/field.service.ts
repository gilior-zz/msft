import {Injectable} from '@angular/core';
import {FieldBase} from "../models/FieldBase";
import {Value} from "../models/template-response";
import {DropdownField} from "../models/DropdownField";
import {TextboxField} from "../models/TextboxField";
import {NumberField} from "../models/NumberField";
import {TextareaField} from "../models/TextAreaField";

@Injectable({
    providedIn: 'root'
})
export class FieldService {

    constructor() {
    }

    getFields(template: Value): FieldBase<any>[] {
        return Object.entries(template.properties).map((prop) => {
            let [key, val] = prop;
            let t = typeof val;
            switch (t) {
                case "string":
                    if (val.length < 50)
                        return new TextboxField({
                            key: key,
                            label: key.replace(/([a-z0-9])([A-Z])/g, '$1 $2'),
                            value: val,
                            required: true,
                            order: 1,
                        })
                    else
                        return new TextareaField({
                            key: key,
                            label: key.replace(/([a-z0-9])([A-Z])/g, '$1 $2'),
                            value: val,
                            required: true,
                            order: 4,
                        })
                case "number":
                    return new NumberField({
                        key: key,
                        label: key.replace(/([a-z0-9])([A-Z])/g, '$1 $2'),
                        value: val,
                        required: true,
                        order: 2
                    })
                default:
                    return new DropdownField({
                        value: val,
                        key: key,
                        label: key.replace(/([a-z0-9])([A-Z])/g, '$1 $2'),
                        options:
                            Object.entries(val).map((i) => {
                                return {key: i[0].toString(), value: i[1].toString()}
                            })

                        ,
                        order: 3
                    })
            }
        }).sort((a, b) => a.order - b.order);
    }
}
