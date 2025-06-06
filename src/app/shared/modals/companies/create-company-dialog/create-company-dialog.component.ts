import {Component, inject, OnInit} from '@angular/core';
import {FaIconComponent} from "@fortawesome/angular-fontawesome";
import {MatDialogModule, MatDialogRef} from "@angular/material/dialog";
import {MatButtonModule} from "@angular/material/button";
import {faCloudArrowUp, faXmark} from "@fortawesome/free-solid-svg-icons";
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {MatSelectModule} from "@angular/material/select";
import {DropzoneMaterialModule} from "@ngx-dropzone/material";
import {MatIconModule} from "@angular/material/icon";
import {MatDatepickerModule} from "@angular/material/datepicker";
import {DropzoneCdkModule} from "@ngx-dropzone/cdk";
import {CompaniesService} from "../../../../services/companies.service";
import {NgxSpinnerService} from "ngx-spinner";
import {AlertsService} from "../../../../services/alerts.service";

@Component({
    selector: 'app-create-company-dialog',
    standalone: true,
    imports: [
        MatDialogModule,
        MatButtonModule,
        MatIconModule,
        FaIconComponent,
        MatFormFieldModule,
        MatInputModule,
        MatSelectModule,
        MatDatepickerModule,
        ReactiveFormsModule,
        DropzoneCdkModule,
        DropzoneMaterialModule
    ],
    templateUrl: './create-company-dialog.component.html',
    styleUrl: './create-company-dialog.component.scss'
})
export class CreateCompanyDialogComponent implements OnInit {

    private companiesService = inject(CompaniesService);
    private formBuilder = inject(FormBuilder);
    private spinner = inject(NgxSpinnerService);
    private alertsService = inject(AlertsService);
    private dialogRef = inject(MatDialogRef);

    public createCompanyForm: FormGroup;

    ngOnInit() {
        this.initCreateCompanyForm();
    }

    initCreateCompanyForm() {
        this.createCompanyForm = this.formBuilder.group({
            name: ['', Validators.required],
            rfc: ['', Validators.required],
            address: ['', Validators.required],
            zip: ['', Validators.required]
        });
    }

    createCompany(){
        const data = this.createCompanyForm.value;
        this.companiesService.createCompanies(data).subscribe({
            next: data => {
                this.spinner.hide();
                this.alertsService.successAlert(data.message).then(
                    res =>{
                        if (res.isConfirmed){
                            this.dialogRef.close(res.isConfirmed);
                        }
                    }
                )
            },
            error: err => {
                this.spinner.hide();
                this.alertsService.errorAlert(err.error.errors);
            }
        })
    }

    protected readonly faXmark = faXmark;
    protected readonly faCloudArrowUp = faCloudArrowUp;
}
