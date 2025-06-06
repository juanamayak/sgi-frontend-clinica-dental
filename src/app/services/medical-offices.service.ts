import {inject, Injectable} from '@angular/core';
import {environment} from "../../environments/environment.development";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class MedicalOfficesService {
    private url = environment.urlApi;
    private httpClient = inject(HttpClient);

    constructor() {
    }

    getMedicalOfficesByCompany(companyUuid: string): Observable<any> {
        return this.httpClient.get(`${this.url}/medical_office/getAllByCompany/${companyUuid}`);
    }

    createMedicalOffice(data: any): Observable<any> {
        return this.httpClient.post(`${this.url}/patient/create`, data);
    }

    updateMedicalOffice(data: any): Observable<any> {
        return this.httpClient.put(`${this.url}/patient/update`, data);
    }

    deleteMedicalOffice(data: any): Observable<any> {
        return this.httpClient.delete(`${this.url}/patient/delete`, data);
    }
}
