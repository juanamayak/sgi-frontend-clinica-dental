import {Component, inject, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {MatDialogModule, MatDialogRef} from "@angular/material/dialog";
import {MatButtonModule} from "@angular/material/button";
import {MatIconModule} from "@angular/material/icon";
import {faXmark} from "@fortawesome/free-solid-svg-icons";
import {FaIconComponent} from "@fortawesome/angular-fontawesome";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {MatSelectModule} from "@angular/material/select";
import {MatDatepickerModule} from "@angular/material/datepicker";
import {provideNativeDateAdapter} from "@angular/material/core";
import {BloodTypesService} from "../../../../services/blood-types.service";
import {forkJoin} from "rxjs";
import {PatientsService} from "../../../../services/patients.service";
import {SessionService} from "../../../../services/session.service";
import {Months} from "../../../../constants/months";
import {AlertsService} from "../../../../services/alerts.service";
import {NgxSpinnerService} from "ngx-spinner";

@Component({
    selector: 'app-create-patient-dialog',
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
    providers: [provideNativeDateAdapter()],
    templateUrl: './create-patient-dialog.component.html',
    styleUrl: './create-patient-dialog.component.scss'
})
export class CreatePatientDialogComponent implements OnInit {

    private formBuilder = inject(FormBuilder);
    private bloodTypesService = inject(BloodTypesService);
    private patientsService = inject(PatientsService);
    private sessionService = inject(SessionService);
    private alertsService = inject(AlertsService);
    private spinner = inject(NgxSpinnerService);
    private dialogRef = inject(MatDialogRef);

    public createPatientForm: FormGroup;

    public months = Months;
    public bloodTypes: any;

    ngOnInit() {
        this.initCreatePatientForm();
        this.loadingInitialData();
    }

    loadingInitialData() {
        forkJoin({
            bloodTypes:  this.bloodTypesService.getBloodTypes()
        }).subscribe({
            next: ({bloodTypes}) => {
                this.bloodTypes = bloodTypes.bloodType;
            },
            error: err => {
                console.log(err);
            }
        });
    }

    initCreatePatientForm(){
        this.createPatientForm = this.formBuilder.group({
            doctor_uuid: [this.sessionService.getUuid(), Validators.required],
            blood_type_id: ['', Validators.required],
            name: ['', Validators.required],
            lastname: ['', Validators.required],
            weight: ['', Validators.required],
            height: ['', Validators.required],
            day: ['', Validators.required],
            month: ['', Validators.required],
            year: ['', Validators.required],
            birthdate: ['', Validators.required],
            allergies: ['', Validators.required],
            address: ['', Validators.required],
        });
    }

    createPatient(){
        this.spinner.show();
        let birthdate: any = '';
        if (this.createPatientForm.value.day) {
            birthdate = `${this.createPatientForm.value.year}-${this.createPatientForm.value.month}-${this.createPatientForm.value.day}`
        } else {
            birthdate = null;
        }

        this.createPatientForm.controls['birthdate'].setValue(birthdate);

        const data = this.createPatientForm.value;

        this.patientsService.createPatient(data).subscribe({
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
}
