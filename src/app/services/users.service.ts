import {inject, Injectable} from '@angular/core';
import {environment} from "../../environments/environment.development";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class UsersService {
    private url = environment.urlApi;
    private httpClient = inject(HttpClient);

    constructor() {
    }

    getUsers(userUuid: string): Observable<any> {
        return this.httpClient.get(`${this.url}/company/getAllByUser/${userUuid}`);
    }

    createUsers(data: any): Observable<any> {
        return this.httpClient.post(`${this.url}/user/store`, data);
    }
}
