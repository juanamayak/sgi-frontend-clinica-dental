import {Routes} from '@angular/router';
import {HomeComponent} from "./home/home.component";
import {PatientsComponent} from "./patients/patients.component";
import {DoctorsComponent} from "./doctors/doctors.component";
import {MedicalOfficesComponent} from "./medical-offices/medical-offices.component";

export default [
    { path: 'inicio', component: HomeComponent },
    { path: 'pacientes', component: PatientsComponent },
    { path: 'doctores', component: DoctorsComponent },
    { path: 'consultorios', component: MedicalOfficesComponent },
] as Routes;
