import {Component, inject, OnInit, ViewChild} from '@angular/core';
import {FaIconComponent, FontAwesomeModule} from "@fortawesome/angular-fontawesome";
import {
    faEllipsisVertical, faHospitalUser,
    faHouseMedical,
    faPenToSquare,
    faPlus,
    faTrash,
    faUserDoctor
} from "@fortawesome/free-solid-svg-icons";
import {PatientsService} from "../../services/patients.service";
import {SessionService} from "../../services/session.service";
import {NgxSpinnerService} from "ngx-spinner";
import {AlertsService} from "../../services/alerts.service";
import {MatDialog} from "@angular/material/dialog";
import {MatTableDataSource, MatTableModule} from "@angular/material/table";
import {MatPaginator, MatPaginatorModule} from "@angular/material/paginator";
import {MatSort, MatSortModule} from "@angular/material/sort";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {MatButtonModule} from "@angular/material/button";
import {MatMenuModule} from "@angular/material/menu";
import {DoctorsService} from "../../services/doctors.service";

@Component({
    selector: 'app-doctors',
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
    ],
    templateUrl: './doctors.component.html',
    styleUrl: './doctors.component.scss'
})
export class DoctorsComponent implements OnInit {

    private doctorsService = inject(DoctorsService);
    private sessionService = inject(SessionService);
    private spinner = inject(NgxSpinnerService);
    private alertsService = inject(AlertsService);
    private dialog = inject(MatDialog);

    public doctorsList: MatTableDataSource<any>;

    public displayedColumns: string[] = ['name', 'lastname', 'active', 'created', 'action'];

    @ViewChild(MatPaginator) paginator: MatPaginator;
    @ViewChild(MatSort) sort: MatSort;


    ngOnInit() {
        this.getDoctors();
    }

    getDoctors() {
        this.spinner.show();
        this.doctorsService.getDoctors(this.sessionService.getUuid()).subscribe({
            next: data => {
                this.doctorsList = new MatTableDataSource(data.patient);
                this.doctorsList.sort = this.sort;
                this.doctorsList.paginator = this.paginator;
                this.spinner.hide();
            },
            error: err => {
                this.spinner.hide();
                this.alertsService.errorAlert(err.error.errors);
            }
        })
    }


    protected readonly faPlus = faPlus;
    protected readonly faHouseMedical = faHouseMedical;
    protected readonly faUserDoctor = faUserDoctor;
    protected readonly faTrash = faTrash;
    protected readonly faEllipsisVertical = faEllipsisVertical;
    protected readonly faPenToSquare = faPenToSquare;
    protected readonly faHospitalUser = faHospitalUser;
}
