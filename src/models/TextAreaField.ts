import {FieldBase} from "./FieldBase";

export class TextareaField extends FieldBase<string> {
    controlType = 'area';
    type = 'textarea';
}
