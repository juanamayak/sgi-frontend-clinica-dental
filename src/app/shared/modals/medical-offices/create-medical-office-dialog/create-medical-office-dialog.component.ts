import {Component, inject, OnInit} from '@angular/core';
import {FaIconComponent} from "@fortawesome/angular-fontawesome";
import {MatDialogModule, MatDialogRef} from "@angular/material/dialog";
import {MatButtonModule} from "@angular/material/button";
import {faXmark} from "@fortawesome/free-solid-svg-icons";
import {MatIconModule} from "@angular/material/icon";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {MatSelectModule} from "@angular/material/select";
import {MatDatepickerModule} from "@angular/material/datepicker";
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {SessionService} from "../../../../services/session.service";
import {AlertsService} from "../../../../services/alerts.service";
import {NgxSpinnerService} from "ngx-spinner";
import {MedicalOfficesService} from "../../../../services/medical-offices.service";

@Component({
    selector: 'app-create-medical-office-dialog',
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
        ReactiveFormsModule
    ],
    templateUrl: './create-medical-office-dialog.component.html',
    styleUrl: './create-medical-office-dialog.component.scss'
})
export class CreateMedicalOfficeDialogComponent implements OnInit{

    private formBuilder = inject(FormBuilder);
    private medicalOfficeService = inject(MedicalOfficesService);
    private sessionService = inject(SessionService);
    private alertsService = inject(AlertsService);
    private spinner = inject(NgxSpinnerService);
    private dialogRef = inject(MatDialogRef);

    public createMedicalOfficeForm: FormGroup;

    ngOnInit() {
        this.initCreateMedicalOfficeForm();
    }

    initCreateMedicalOfficeForm(){
        this.createMedicalOfficeForm = this.formBuilder.group({
            name: ['', Validators.required],
            address: ['', Validators.required],
        })
    }

    protected readonly faXmark = faXmark;
}
