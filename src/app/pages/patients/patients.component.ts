import {Component, inject, OnInit, ViewChild} from '@angular/core';
import {MatTableDataSource, MatTableModule} from "@angular/material/table";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {MatPaginator, MatPaginatorModule} from "@angular/material/paginator";
import {MatSort, MatSortModule} from "@angular/material/sort";
import {FontAwesomeModule} from "@fortawesome/angular-fontawesome";
import {PatientsService} from "../../services/patients.service";
import {
    faCalendarDays,
    faEllipsisVertical,
    faHospitalUser,
    faPenToSquare,
    faTrash,
    faUserPlus
} from "@fortawesome/free-solid-svg-icons";
import {SessionService} from "../../services/session.service";
import {NgxSpinnerService} from "ngx-spinner";
import {AlertsService} from "../../services/alerts.service";
import {MatDialog} from "@angular/material/dialog";
import {
    CreatePatientDialogComponent
} from "../../shared/modals/patients/create-patient-dialog/create-patient-dialog.component";
import {MatButtonModule} from "@angular/material/button";
import {MatMenuModule} from "@angular/material/menu";
import {RouterLink} from "@angular/router";

@Component({
    selector: 'app-patients',
    standalone: true,
    imports: [
        MatFormFieldModule,
        MatInputModule,
        MatTableModule,
        MatPaginatorModule,
        MatSortModule,
        FontAwesomeModule,
        MatButtonModule,
        MatMenuModule,
        RouterLink,
    ],
    templateUrl: './patients.component.html',
    styleUrl: './patients.component.scss'
})
export class PatientsComponent implements OnInit {

    private patientsService = inject(PatientsService);
    private sessionService = inject(SessionService);
    private spinner = inject(NgxSpinnerService);
    private alertsService = inject(AlertsService);
    private dialog = inject(MatDialog);

    public patientsList: MatTableDataSource<any>;

    public displayedColumns: string[] = ['appointments', 'name', 'lastname', 'weight', 'height', 'birthdate', 'allergies', 'address', 'created', 'action'];

    @ViewChild(MatPaginator) paginator: MatPaginator;
    @ViewChild(MatSort) sort: MatSort;

    ngOnInit() {
        this.getPatients();
    }

    getPatients(){
        this.spinner.show();
        const data = {
            doctor_uuid: this.sessionService.getUuid()
        }
        this.patientsService.getPatientsByDoctor(data).subscribe({
            next: data => {
                this.patientsList = new MatTableDataSource(data.patient);
                this.patientsList.sort = this.sort;
                this.patientsList.paginator = this.paginator;
                this.spinner.hide()
            },
            error: err => {
                this.spinner.hide();
                this.alertsService.errorAlert(err.error.errors);
            }
        })
    }

    openCreatePatientDialog(){
        const dialogRef = this.dialog.open(CreatePatientDialogComponent);

        dialogRef.afterClosed().subscribe(result => {
            if (result){
                this.getPatients();
            }
        });
    }

    protected readonly faHospitalUser = faHospitalUser;
    protected readonly faUserPlus = faUserPlus;
    protected readonly faEllipsisVertical = faEllipsisVertical;
    protected readonly faPenToSquare = faPenToSquare;
    protected readonly faTrash = faTrash;
    protected readonly faCalendarDays = faCalendarDays;
}
