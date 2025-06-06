import {Component, inject, OnInit, ViewChild} from '@angular/core';
import {PatientsService} from "../../services/patients.service";
import {SessionService} from "../../services/session.service";
import {NgxSpinnerService} from "ngx-spinner";
import {AlertsService} from "../../services/alerts.service";
import {MatDialog} from "@angular/material/dialog";
import {MatTableDataSource, MatTableModule} from "@angular/material/table";
import {MatPaginator, MatPaginatorModule} from "@angular/material/paginator";
import {MatSort, MatSortModule} from "@angular/material/sort";
import {FontAwesomeModule} from "@fortawesome/angular-fontawesome";
import {
    faBuilding, faEllipsisVertical,
    faHospitalUser,
    faPenToSquare,
    faPlus,
    faTrash,
    faUserDoctor
} from "@fortawesome/free-solid-svg-icons";
import {MatButtonModule} from "@angular/material/button";
import {MatMenuModule} from "@angular/material/menu";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {CompaniesService} from "../../services/companies.service";
import {
    CreatePatientDialogComponent
} from "../../shared/modals/patients/create-patient-dialog/create-patient-dialog.component";
import {
    CreateCompanyDialogComponent
} from "../../shared/modals/companies/create-company-dialog/create-company-dialog.component";

@Component({
    selector: 'app-companies',
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
    templateUrl: './companies.component.html',
    styleUrl: './companies.component.scss'
})
export class CompaniesComponent implements OnInit {
    private companiesService = inject(CompaniesService);
    private sessionService = inject(SessionService);
    private spinner = inject(NgxSpinnerService);
    private alertsService = inject(AlertsService);
    private dialog = inject(MatDialog);

    public companiesList: MatTableDataSource<any>;

    public displayedColumns: string[] = ['name', 'rfc', 'address', 'zip', 'sat_file', 'created', 'action'];

    @ViewChild(MatPaginator) paginator: MatPaginator;
    @ViewChild(MatSort) sort: MatSort;

    ngOnInit() {
        this.getCompanies();
    }

    getCompanies() {
        this.spinner.show();
        this.companiesService.getCompaniesByUser(this.sessionService.getUuid()).subscribe({
            next: data => {
                this.companiesList = new MatTableDataSource(data.company);
                this.companiesList.sort = this.sort;
                this.companiesList.paginator = this.paginator;
                this.spinner.hide();
            },
            error: err => {
                this.spinner.hide();
                this.alertsService.errorAlert(err.error.errors);
            }
        });
    }

    openCreateCompanyDialog(){
        const dialogRef = this.dialog.open(CreateCompanyDialogComponent);

        dialogRef.afterClosed().subscribe(result => {
            if (result){
                this.getCompanies();
            }
        });
    }


    protected readonly faPlus = faPlus;
    protected readonly faUserDoctor = faUserDoctor;
    protected readonly faBuilding = faBuilding;
    protected readonly faTrash = faTrash;
    protected readonly faPenToSquare = faPenToSquare;
    protected readonly faHospitalUser = faHospitalUser;
    protected readonly faEllipsisVertical = faEllipsisVertical;
}
