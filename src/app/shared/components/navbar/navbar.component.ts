import { Component } from '@angular/core';
import {MatToolbar} from "@angular/material/toolbar";
import {MatIcon} from "@angular/material/icon";
import {MatIconButton} from "@angular/material/button";
import {MatMenu, MatMenuTrigger} from "@angular/material/menu";
import {FaIconComponent} from "@fortawesome/angular-fontawesome";
import {fa9, faArrowRightFromBracket, faGear} from "@fortawesome/free-solid-svg-icons";
import {faCalendar} from "@fortawesome/free-regular-svg-icons";

@Component({
  selector: 'app-navbar',
  standalone: true,
    imports: [
        MatToolbar,
        MatIcon,
        MatIconButton,
        MatMenuTrigger,
        MatMenu,
        FaIconComponent
    ],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent {

    protected readonly faArrowRightFromBracket = faArrowRightFromBracket;
    protected readonly faGear = faGear;
    protected readonly faCalendar = faCalendar;
    protected readonly fa9 = fa9;
}
