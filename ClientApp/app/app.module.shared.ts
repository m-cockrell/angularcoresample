import { AUTH_PROVIDERS } from 'angular2-jwt/angular2-jwt';
import { AdminAuthGuard } from './services/admin-auth-guard.service';
import { AuthGuard } from './services/auth-guard.service';

import { ErrorHandler } from '@angular/core';
import { AppErrorHandler } from './app.error-handler';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { ToastyModule } from 'ng2-toasty';
import { ChartModule } from 'angular2-chartjs';

import { AppComponent } from './components/app/app.component'
import { NavMenuComponent } from './components/navmenu/navmenu.component';
import { VehicleFormComponent } from './components/vehicle-form/vehicle-form.component';
import { ViewVehicleComponent } from './components/view-vehicle/view-vehicle.component';
import { VehicleListComponent } from './components/vehicle-list/vehicle-list.component';
import { AdminComponent } from './components/admin/admin.component';
import { PaginationComponent } from './components/shared/pagination.component';

import { VehicleService } from './services/vehicle.service';
import { PhotoService } from './services/photo.service';
import { Auth } from './services/auth.service';


export const sharedConfig: NgModule = {
    bootstrap: [ AppComponent ],
    declarations: [
        AppComponent,
        NavMenuComponent,
        VehicleFormComponent,
        ViewVehicleComponent,
        VehicleListComponent,
        PaginationComponent,
        AdminComponent
    ],
    imports: [
        FormsModule,
        ToastyModule.forRoot(),
        ChartModule,
        RouterModule.forRoot([
            { path: '', redirectTo: 'vehicles', pathMatch: 'full' },
            { path: 'vehicles/new', component: VehicleFormComponent, canActivate: [ AuthGuard ] },
            { path: 'vehicles/edit/:id', component: VehicleFormComponent, canActivate: [ AuthGuard ] },
            { path: 'vehicles/:id', component: ViewVehicleComponent },
            { path: 'vehicles', component: VehicleListComponent },
            { path: 'admin', component: AdminComponent, canActivate: [ AdminAuthGuard ] },
            { path: '**', redirectTo: 'vehicles' }
        ])
    ],
    providers: [
        { provide: ErrorHandler, useClass: AppErrorHandler},
        VehicleService,
        PhotoService,
        Auth,
        AuthGuard,
        AdminAuthGuard,
        AUTH_PROVIDERS,
    ]
};
