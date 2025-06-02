import {inject, Injectable} from '@angular/core';
import {Observable} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {environment} from "../../environments/environment.development";

@Injectable({
    providedIn: 'root'
})
export class PatientsService {
    private url = environment.urlApi;
    private httpClient = inject(HttpClient);

    constructor() {
    }

    getPatientsByDoctor(data: any): Observable<any> {
        return this.httpClient.post(`${this.url}/patient/getAllByDoctor`, data);
    }

    createPatient(data: any): Observable<any> {
        return this.httpClient.post(`${this.url}/patient/create`, data);
    }
}
