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

    getPatient(patientUuid: string){
        return this.httpClient.get(`${this.url}/patient/${patientUuid}`);
    }

    getPatientsByDoctor(doctorUuid: string): Observable<any> {
        return this.httpClient.get(`${this.url}/patient/getAllByDoctor/${doctorUuid}`);
    }

    createPatient(data: any): Observable<any> {
        return this.httpClient.post(`${this.url}/patient/create`, data);
    }
}
