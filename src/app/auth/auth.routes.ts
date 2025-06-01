import {Routes} from '@angular/router';
import {LoginComponent} from "./login/login.component";
import {AdminLoginComponent} from "./admin-login/admin-login.component";

export default [
    {
        path: 'login',
        component: LoginComponent
    },
    {
        path: 'admin-login',
        component: AdminLoginComponent
    }
] as Routes;
