import {createAction, props} from '@ngrx/store';
import {Value} from "../models/template-response";


export const update_templates = createAction('[Templates Component] Update',  props<{templates:Value[]}>());
