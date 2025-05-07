import {Routes} from '@angular/router';
import {MainLayoutComponent} from "./layouts/main-layout/main-layout.component";
import {AuthLayoutComponent} from "./layouts/auth-layout/auth-layout.component";

export const routes: Routes = [
    {
        path: '',
        component: AuthLayoutComponent,
        children: [
            {
                path: 'auth', loadChildren: () => import('./auth/auth.routes')
            },
        ]
    },
    {
        path: '',
        component: MainLayoutComponent,
        // canActivate: [AuthGuard],
        children: [
            {
                path: '', loadChildren: () => import('./pages/pages.routes')
            },
        ],
    },
];
