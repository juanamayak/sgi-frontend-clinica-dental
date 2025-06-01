import {CanActivateFn, Router} from '@angular/router';
import {inject} from "@angular/core";
import {UsersService} from "../../services/users.service";

export const AuthGuard: CanActivateFn = (route, state) => {
    const userService = inject(UsersService);
    const router = inject(Router);
    const token = userService.getToken();

    if (token=== null) {
        router.navigate(['auth/login']);
        return false;
    } else {
        return true;
    }
};
