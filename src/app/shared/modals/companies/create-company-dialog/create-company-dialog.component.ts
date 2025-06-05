import {Component, inject, OnInit} from '@angular/core';
import {FaIconComponent} from "@fortawesome/angular-fontawesome";
import {MatDialogModule} from "@angular/material/dialog";
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

    private formBuilder = inject(FormBuilder);

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

    protected readonly faXmark = faXmark;
    protected readonly faCloudArrowUp = faCloudArrowUp;
}
