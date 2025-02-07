import { Routes } from '@angular/router';
import { LoginComponent } from './paginas/login/login.component';
import { TareasComponent } from './paginas/tareas/tareas.component';




export const routes: Routes = [

    
    {
      path: '',
      loadComponent: () => import('./paginas/login/login.component').then(m => m.LoginComponent),
    },
    {
      path: 'registro-usuario',
    
      loadComponent: () => import('./paginas/registro-usuario/registro-usuario.component').then(m => m.RegistroUsuarioComponent),
  
    },
    {
      path: 'tareas',
     
      loadComponent: () => import('./paginas/tareas/tareas.component').then(m => m.TareasComponent),
  
    }
    
  ];
  
  