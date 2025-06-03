import {Component, inject, Input, OnInit} from '@angular/core';
import {MatCardModule} from "@angular/material/card";
import {FaIconComponent} from "@fortawesome/angular-fontawesome";
import {faCalendarDays, faCalendarPlus, faClock, faHospitalUser, faUserPlus} from "@fortawesome/free-solid-svg-icons";
import {PatientsService} from "../../services/patients.service";
import {forkJoin} from "rxjs";
import {MedicalAppointmentsService} from "../../services/medical-appointments.service";
import {RouterLink} from "@angular/router";
import {faCalendar} from "@fortawesome/free-regular-svg-icons";

@Component({
  selector: 'app-medical-appointments',
  standalone: true,
    imports: [
        MatCardModule,
        FaIconComponent,
        RouterLink,
    ],
  templateUrl: './medical-appointments.component.html',
  styleUrl: './medical-appointments.component.scss'
})
export class MedicalAppointmentsComponent implements OnInit{

    @Input() patientUuid: string;

    private patientsService = inject(PatientsService);
    private medicalApoointmentsService = inject(MedicalAppointmentsService);

    public patient: any;
    public appointments: any;

    ngOnInit() {
        this.loadingInitialData();
    }

    loadingInitialData() {
        forkJoin({
            patient:  this.patientsService.getPatient(this.patientUuid),
            appointments: this.medicalApoointmentsService.getMedicalAppointments(this.patientUuid)
        }).subscribe({
            next: ({patient, appointments}: any) => {
                this.patient = patient.patient;
                this.appointments = appointments.medicalAppointment;
            },
            error: err => {
                console.log(err);
            }
        });
    }

    protected readonly faHospitalUser = faHospitalUser;
    protected readonly faCalendarDays = faCalendarDays;
    protected readonly faCalendar = faCalendar;
    protected readonly faClock = faClock;
    protected readonly faCalendarPlus = faCalendarPlus;
    protected readonly faUserPlus = faUserPlus;
}
