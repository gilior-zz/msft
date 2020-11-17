import {ActionReducer, createReducer, on} from '@ngrx/store';
import {update_templates} from './actions';
import {initialState} from "./state";
import {Value} from "../models/template-response";

export const _reducer = createReducer(
    initialState,
    on(update_templates, (state, {templates}) => (templates))
);

export function reducer(state, action) {
    return _reducer(state, action);
}


export const TemplatesStore={
    templates: reducer
}

export type Created = { templates: Value[] };

