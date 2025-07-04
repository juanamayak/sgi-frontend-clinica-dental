import {ApplicationConfig, provideZoneChangeDetection} from '@angular/core';
import {provideRouter, withComponentInputBinding} from '@angular/router';

import {routes} from './app.routes';
import {provideAnimationsAsync} from '@angular/platform-browser/animations/async';
import {provideIcons} from "./core/icons/icons.provider";
import {provideHttpClient, withInterceptors} from "@angular/common/http";
import {jwtInterceptor} from "./core/interceptors/jwt.interceptor";

export const appConfig: ApplicationConfig = {
    providers: [
        provideZoneChangeDetection({eventCoalescing: true}),
        provideRouter(routes, withComponentInputBinding()),
        provideAnimationsAsync(),
        provideHttpClient(withInterceptors([jwtInterceptor])),
        provideIcons(),
    ]
};
