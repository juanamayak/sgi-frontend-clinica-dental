import {Component, inject, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import {SessionService} from "../../services/session.service";
import {NgxSpinnerService} from "ngx-spinner";
import {AlertsService} from "../../services/alerts.service";
import {Router, RouterLink} from "@angular/router";
import {CommonModule} from "@angular/common";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {MatButtonModule} from "@angular/material/button";

@Component({
    selector: 'app-admin-login',
    standalone: true,
    imports: [
        CommonModule,
        FormsModule,
        MatFormFieldModule,
        MatInputModule,
        MatButtonModule,
        ReactiveFormsModule,
        RouterLink
    ],
    templateUrl: './admin-login.component.html',
    styleUrl: './admin-login.component.scss'
})
export class AdminLoginComponent implements OnInit{

    private sessionService = inject(SessionService);
    private spinner = inject(NgxSpinnerService);
    private formBuilder = inject(FormBuilder);
    private alertsService = inject(AlertsService);
    private router = inject(Router);

    public loginForm: FormGroup;

    ngOnInit(){
        this.initLoginForm();
    }

    initLoginForm(){
        this.loginForm = this.formBuilder.group({
            email: ['', [Validators.required, Validators.email]],
            password: ['', [Validators.required, Validators.minLength(8)]],
        })
    }

    onLogin(){
        this.spinner.show();
        const data = this.loginForm.value;
        this.sessionService.adminsLogin(data).subscribe({
            next: res => {
                const token = res.token;
                const profile = res.user;
                sessionStorage.setItem(this.sessionService.jwtToken, token);
                sessionStorage.setItem(this.sessionService.profileToken, btoa(JSON.stringify(profile)));

                this.router.navigate(['inicio']);
                this.spinner.hide();
            },
            error: err => {
                this.spinner.hide();
                this.alertsService.errorAlert(err.error.errors);
            }
        })
    }
}
