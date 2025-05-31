import {Component, inject, OnInit, ViewChild} from '@angular/core';
import {MatTableDataSource, MatTableModule} from "@angular/material/table";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {MatPaginator, MatPaginatorModule} from "@angular/material/paginator";
import {MatSort, MatSortModule} from "@angular/material/sort";
import {FontAwesomeModule} from "@fortawesome/angular-fontawesome";
import {PatientsService} from "../../services/patients.service";
import {faHospitalUser} from "@fortawesome/free-solid-svg-icons";

@Component({
    selector: 'app-patients',
    standalone: true,
    imports: [
        MatFormFieldModule,
        MatInputModule,
        MatTableModule,
        MatPaginatorModule,
        MatSortModule,
        FontAwesomeModule
    ],
    templateUrl: './patients.component.html',
    styleUrl: './patients.component.scss'
})
export class PatientsComponent implements OnInit {

    private patientsService = inject(PatientsService);

    public patientsList: MatTableDataSource<any>;

    public displayedColumns: string[] = ['id'];

    @ViewChild(MatPaginator) paginator: MatPaginator;
    @ViewChild(MatSort) sort: MatSort;

    protected readonly faHospitalUser = faHospitalUser;

    ngOnInit() {
        this.getPatients();
    }

    getPatients(){
        this.patientsService.getPatientsByDoctor().subscribe({
            next: data => {
                console.log(data);
            },
            error: error => {
                console.log(error);
            }
        })
    }
}
