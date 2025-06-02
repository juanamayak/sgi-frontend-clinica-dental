import {Component, inject, ViewChild} from '@angular/core';
import {PatientsService} from "../../services/patients.service";
import {SessionService} from "../../services/session.service";
import {NgxSpinnerService} from "ngx-spinner";
import {AlertsService} from "../../services/alerts.service";
import {MatDialog} from "@angular/material/dialog";
import {MatTableDataSource} from "@angular/material/table";
import {MatPaginator} from "@angular/material/paginator";
import {MatSort} from "@angular/material/sort";
import {FaIconComponent} from "@fortawesome/angular-fontawesome";
import {faHospitalUser, faHouseMedical, faPlus, faUserPlus} from "@fortawesome/free-solid-svg-icons";

@Component({
    selector: 'app-medical-offices',
    standalone: true,
    imports: [
        FaIconComponent
    ],
    templateUrl: './medical-offices.component.html',
    styleUrl: './medical-offices.component.scss'
})
export class MedicalOfficesComponent {
    private patientsService = inject(PatientsService);
    private sessionService = inject(SessionService);
    private spinner = inject(NgxSpinnerService);
    private alertsService = inject(AlertsService);
    private dialog = inject(MatDialog);

    public patientsList: MatTableDataSource<any>;

    public displayedColumns: string[] = ['company', 'name', 'address', 'active', 'created', 'action'];

    @ViewChild(MatPaginator) paginator: MatPaginator;
    @ViewChild(MatSort) sort: MatSort;
    protected readonly faHospitalUser = faHospitalUser;
    protected readonly faHouseMedical = faHouseMedical;
    protected readonly faPlus = faPlus;
}
