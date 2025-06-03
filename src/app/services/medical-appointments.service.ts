import {inject, Injectable} from '@angular/core';
import {environment} from "../../environments/environment.development";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class MedicalAppointmentsService {
    private url = environment.urlApi;
    private httpClient = inject(HttpClient);

    constructor() {
    }

    getMedicalAppointments(patientUuid: string): Observable<any> {
        return this.httpClient.get(`${this.url}/medical_appointment/getAllByPatient/${patientUuid}`);
    }
}
