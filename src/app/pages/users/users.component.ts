import {Component, inject, OnInit, ViewChild} from '@angular/core';
import {FaIconComponent, FontAwesomeModule} from "@fortawesome/angular-fontawesome";
import {
    faBuilding,
    faEllipsisVertical,
    faPenToSquare,
    faPlus,
    faTrash,
    faUsers
} from "@fortawesome/free-solid-svg-icons";
import {
    MatCell,
    MatCellDef,
    MatColumnDef,
    MatHeaderCell,
    MatHeaderRow,
    MatHeaderRowDef,
    MatRow, MatRowDef, MatTable, MatTableDataSource, MatTableModule
} from "@angular/material/table";
import {MatButtonModule, MatIconButton} from "@angular/material/button";
import {MatMenu, MatMenuModule} from "@angular/material/menu";
import {MatPaginator, MatPaginatorModule} from "@angular/material/paginator";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {MatSort, MatSortModule} from "@angular/material/sort";
import {CompaniesService} from "../../services/companies.service";
import {SessionService} from "../../services/session.service";
import {NgxSpinnerService} from "ngx-spinner";
import {AlertsService} from "../../services/alerts.service";
import {MatDialog} from "@angular/material/dialog";
import {
    CreateCompanyDialogComponent
} from "../../shared/modals/companies/create-company-dialog/create-company-dialog.component";
import {UsersService} from "../../services/users.service";
import {CreateUserDialogComponent} from "../../shared/modals/users/create-user-dialog/create-user-dialog.component";

@Component({
    selector: 'app-users',
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
    templateUrl: './users.component.html',
    styleUrl: './users.component.scss'
})
export class UsersComponent implements OnInit {

    private usersService = inject(UsersService);
    private sessionService = inject(SessionService);
    private spinner = inject(NgxSpinnerService);
    private alertsService = inject(AlertsService);
    private dialog = inject(MatDialog);

    public usersList: MatTableDataSource<any>;

    public displayedColumns: string[] = ['name', 'rfc', 'address', 'zip', 'sat_file', 'created', 'action'];

    @ViewChild(MatPaginator) paginator: MatPaginator;
    @ViewChild(MatSort) sort: MatSort;

    ngOnInit() {
        this.getUsers();
    }

    getUsers() {
        this.spinner.show();
        this.usersService.getUsers(this.sessionService.getUuid()).subscribe({
            next: data => {
                this.usersList = new MatTableDataSource(data.company);
                this.usersList.sort = this.sort;
                this.usersList.paginator = this.paginator;
                this.spinner.hide();
            },
            error: err => {
                this.spinner.hide();
                this.alertsService.errorAlert(err.error.errors);
            }
        });
    }

    openCreateUserDialog(){
        const dialogRef = this.dialog.open(CreateUserDialogComponent);

        dialogRef.afterClosed().subscribe(result => {
            if (result){
                this.getUsers();
            }
        });
    }

    protected readonly faPlus = faPlus;
    protected readonly faBuilding = faBuilding;
    protected readonly faTrash = faTrash;
    protected readonly faPenToSquare = faPenToSquare;
    protected readonly faEllipsisVertical = faEllipsisVertical;
    protected readonly faUsers = faUsers;
}
