import {Component, inject, OnInit, ViewChild} from '@angular/core';
import {PatientsService} from "../../services/patients.service";
import {SessionService} from "../../services/session.service";
import {NgxSpinnerService} from "ngx-spinner";
import {AlertsService} from "../../services/alerts.service";
import {MatDialog} from "@angular/material/dialog";
import {
    MatCell,
    MatCellDef,
    MatColumnDef,
    MatHeaderCell,
    MatHeaderRow, MatHeaderRowDef, MatRow, MatRowDef, MatTable,
    MatTableDataSource, MatTableModule
} from "@angular/material/table";
import {MatPaginator, MatPaginatorModule} from "@angular/material/paginator";
import {MatSort, MatSortModule} from "@angular/material/sort";
import {FaIconComponent, FontAwesomeModule} from "@fortawesome/angular-fontawesome";
import {
    faEllipsisVertical,
    faHospitalUser,
    faHouseMedical,
    faPenToSquare,
    faPlus,
    faTrash,
    faUserPlus
} from "@fortawesome/free-solid-svg-icons";
import {MatButtonModule, MatIconButton} from "@angular/material/button";
import {MatMenu, MatMenuModule} from "@angular/material/menu";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";

@Component({
    selector: 'app-medical-offices',
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
    templateUrl: './medical-offices.component.html',
    styleUrl: './medical-offices.component.scss'
})
export class MedicalOfficesComponent implements OnInit {
    private patientsService = inject(PatientsService);
    private sessionService = inject(SessionService);
    private spinner = inject(NgxSpinnerService);
    private alertsService = inject(AlertsService);
    private dialog = inject(MatDialog);

    public medicalOfficesList: MatTableDataSource<any>;

    public displayedColumns: string[] = ['company', 'name', 'address', 'active', 'created', 'action'];

    @ViewChild(MatPaginator) paginator: MatPaginator;
    @ViewChild(MatSort) sort: MatSort;


    ngOnInit() {
        this.getMedicalOffices();
    }

    getMedicalOffices() {

    }


    protected readonly faHospitalUser = faHospitalUser;
    protected readonly faHouseMedical = faHouseMedical;
    protected readonly faPlus = faPlus;
    protected readonly faTrash = faTrash;
    protected readonly faPenToSquare = faPenToSquare;
    protected readonly faEllipsisVertical = faEllipsisVertical;
}
