import {Component} from '@angular/core';
import {MatIcon} from "@angular/material/icon";
import {FontAwesomeModule} from "@fortawesome/angular-fontawesome";
import {
    faArrowRightFromBracket, faBuilding,
    faCashRegister,
    faHome, faHospital,
    faHospitalUser, faHouseMedical, faListOl,
    faMoneyBill, faUserDoctor, faUsers
} from "@fortawesome/free-solid-svg-icons";
import {RouterLink} from "@angular/router";

@Component({
    selector: 'app-sidebar',
    standalone: true,
    imports: [
        MatIcon,
        FontAwesomeModule,
        RouterLink
    ],
    templateUrl: './sidebar.component.html',
    styleUrl: './sidebar.component.scss'
})
export class SidebarComponent {

    protected readonly faArrowRightFromBracket = faArrowRightFromBracket;
    protected readonly faHome = faHome;
    protected readonly faHospitalUser = faHospitalUser;
    protected readonly faMoneyBill = faMoneyBill;
    protected readonly faCashRegister = faCashRegister;
    protected readonly faHospital = faHospital;
    protected readonly faUserDoctor = faUserDoctor;
    protected readonly faHouseMedical = faHouseMedical;
    protected readonly faBuilding = faBuilding;
    protected readonly faListOl = faListOl;
    protected readonly faUsers = faUsers;
}
