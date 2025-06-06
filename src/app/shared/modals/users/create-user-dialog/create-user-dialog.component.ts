import {Component, inject, OnInit} from '@angular/core';
import {MatDialogModule, MatDialogRef} from "@angular/material/dialog";
import {MatButtonModule} from "@angular/material/button";
import {MatIconModule} from "@angular/material/icon";
import {FaIconComponent} from "@fortawesome/angular-fontawesome";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {MatSelectModule} from "@angular/material/select";
import {MatDatepickerModule} from "@angular/material/datepicker";
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {DropzoneCdkModule} from "@ngx-dropzone/cdk";
import {DropzoneMaterialModule} from "@ngx-dropzone/material";

import {faShuffle, faXmark} from "@fortawesome/free-solid-svg-icons";
import {UsersService} from "../../../../services/users.service";
import {AlertsService} from "../../../../services/alerts.service";
import {NgxSpinnerService} from "ngx-spinner";

@Component({
    selector: 'app-create-user-dialog',
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
    templateUrl: './create-user-dialog.component.html',
    styleUrl: './create-user-dialog.component.scss'
})
export class CreateUserDialogComponent implements OnInit {

    private usersService = inject(UsersService);
    private formBuilder = inject(FormBuilder);
    private alertsService = inject(AlertsService);
    private spinner = inject(NgxSpinnerService);
    private dialogRef = inject(MatDialogRef)

    public createUserForm: FormGroup;


    ngOnInit() {
        this.initCreateUserForm();
    }

    initCreateUserForm(){
        this.createUserForm = this.formBuilder.group({
            name: ['', Validators.required],
            lastname: ['', Validators.required],
            telephone: ['', Validators.required],
            email: ['', Validators.required],
            password: ['', Validators.required],
        });
    }

    createUser(){
        const data = this.createUserForm.value;
        this.usersService.createUsers(data).subscribe({
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
