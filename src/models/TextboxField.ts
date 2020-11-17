import {FieldBase} from "./FieldBase";

export class TextboxField extends FieldBase<string> {
    controlType = 'textbox';
    type='text';
}
