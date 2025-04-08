import { Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { HomeComponent } from './pages/home/home.component';
import { authGuard } from './auth.guard';
import { AutoresComponent } from './pages/autores/autores.component';
import { LibrosComponent } from './pages/libros/libros.component';

export const routes: Routes = [
    {
        path: '',
        component: LoginComponent
    },
    {
        path: 'autores',
        component: AutoresComponent,
        canActivate: [authGuard]  // Añadir protección
    },
    {
        path: 'libros',
        component: LibrosComponent,
        canActivate: [authGuard]  // Añadir protección
    },
    {
        path: 'home',
        component: HomeComponent,
        canActivate: [authGuard]
    },
    {
        path: '**',
        redirectTo: ''
    }
];