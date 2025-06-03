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

    getMedicalOffices(data: any): Observable<any> {
        return this.httpClient.post(`${this.url}/medical_office/getAllByCompany`, data);
    }
}
