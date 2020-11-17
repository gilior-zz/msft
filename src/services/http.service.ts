import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {TemplateResponse,Value} from "../models/template-response";
import {Observable} from "rxjs";
import {GET_URL, DEPLOY_URL} from "../const/const";
import {IRes} from "../models/update-response";

@Injectable({
    providedIn: 'root'
})
export class HttpService {

    constructor(private  httpClient: HttpClient) {
    }

    get_templates(): Observable<TemplateResponse> {
        return this.httpClient.get<TemplateResponse>(GET_URL);
    }

    deploy_templates(templates:Value[]): Observable<IRes> {
        return this.httpClient.get<IRes>(DEPLOY_URL);
    }
}
