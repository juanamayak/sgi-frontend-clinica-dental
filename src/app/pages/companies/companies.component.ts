import {Component, inject, ViewChild} from '@angular/core';
import {PatientsService} from "../../services/patients.service";
import {SessionService} from "../../services/session.service";
import {NgxSpinnerService} from "ngx-spinner";
import {AlertsService} from "../../services/alerts.service";
import {MatDialog} from "@angular/material/dialog";
import {MatTableDataSource} from "@angular/material/table";
import {MatPaginator} from "@angular/material/paginator";
import {MatSort} from "@angular/material/sort";

@Component({
  selector: 'app-companies',
  standalone: true,
  imports: [],
  templateUrl: './companies.component.html',
  styleUrl: './companies.component.scss'
})
export class CompaniesComponent {
    private patientsService = inject(PatientsService);
    private sessionService = inject(SessionService);
    private spinner = inject(NgxSpinnerService);
    private alertsService = inject(AlertsService);
    private dialog = inject(MatDialog);

    public patientsList: MatTableDataSource<any>;

    public displayedColumns: string[] = ['name', 'lastname', 'weight', 'height', 'birthdate', 'allergies', 'address', 'created', 'action'];

    @ViewChild(MatPaginator) paginator: MatPaginator;
    @ViewChild(MatSort) sort: MatSort;
}
