import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { ModelComponent } from '../shared/ui/model/model.component';
import { RegistroUsuarioComponent } from '../registro-usuario/registro-usuario.component';
import { UsuarioService } from '../../servicios/usuario.service';
import { Credentials } from '../../modelo/credenciales';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'dc-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule,
     RouterModule,CardModule,ButtonModule,
     InputTextModule,ModelComponent,RegistroUsuarioComponent],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  nuevoUsuario:boolean=false;
  constructor(private fb: FormBuilder, private _usuarioService: UsuarioService,
    private _router :Router,  private toastr: ToastrService) {
    this.loginForm = this.fb.group({
      email: ['', Validators.required],
      password: ['', Validators.required]
    });
  }
  ngOnInit(): void {
    const userlogeado = localStorage.getItem("user")
   if (userlogeado != null) {
    this._router.navigateByUrl('/tareas');
   }
   
  }

  onLogin() {
    if (this.loginForm.valid) {

       const cre:Credentials = this.loginForm.value;

      this._usuarioService.login(cre).subscribe({
        next: (response: any) => {
         
          localStorage.setItem("user", cre.email?.toString() ?? "");
          this._router.navigateByUrl('/tareas');
        },
        error: (err) => {
          this.toastr.error("Credenciales incorrectas ");
          console.error("Error al registrar usuario:", err);
        }
      });
    }
  }

  regristrarUsuario(){
    this.nuevoUsuario=true
  }

  salir(){
    this.nuevoUsuario=false
  }
}
