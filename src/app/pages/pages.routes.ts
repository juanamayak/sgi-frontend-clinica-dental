import {Routes} from '@angular/router';
import {HomeComponent} from "./home/home.component";
import {DoctorsComponent} from "./doctors/doctors.component";
import {MedicalOfficesComponent} from "./medical-offices/medical-offices.component";
import {CompaniesComponent} from "./companies/companies.component";
import {UsersComponent} from "./users/users.component";

export default [
    {path: 'inicio', component: HomeComponent},
    {
        path: 'pacientes',
        children: [
            {
                path: '', loadChildren: () => import('./patients/patients.routes')
            },
        ]
    },
    {path: 'doctores', component: DoctorsComponent},
    {path: 'consultorios', component: MedicalOfficesComponent},
    {path: 'empresas', component: CompaniesComponent},
    {path: 'usuarios', component: UsersComponent},
] as Routes;
