import {Routes} from '@angular/router';
import {PatientsComponent} from "./patients.component";
import {MedicalAppointmentsComponent} from "../medical-appointments/medical-appointments.component";

export default [
    {path: '', component: PatientsComponent},
    {path: 'citas/:patientUuid', component: MedicalAppointmentsComponent}
] as Routes;
