import {AfterViewInit, Component} from '@angular/core';
import {NavbarComponent} from "../../shared/components/navbar/navbar.component";
import {MatSidenavModule} from "@angular/material/sidenav";
import {RouterOutlet} from "@angular/router";
import {SidebarComponent} from "../../shared/components/sidebar/sidebar.component";
import {MatButton, MatIconButton, MatMiniFabButton} from "@angular/material/button";

@Component({
    selector: 'app-main-layout',
    standalone: true,
    imports: [
        NavbarComponent,
        MatSidenavModule,
        RouterOutlet,
        SidebarComponent,
        MatIconButton
    ],
    templateUrl: './main-layout.component.html',
    styleUrl: './main-layout.component.scss'
})
export class MainLayoutComponent implements AfterViewInit{

    public isMobile: boolean;

    constructor() {
    }

    ngOnInit(): void {}

    ngAfterViewInit(): void {
        if (window.innerWidth <= 1024) {
            this.isMobile = true;
        } else {
            this.isMobile = false;
        }
    }

}
