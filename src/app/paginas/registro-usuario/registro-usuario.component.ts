import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { ModelComponent } from '../shared/ui/model/model.component';
import { UsuarioService } from '../../servicios/usuario.service';
import { User } from '../../modelo/user';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'dc-registro-usuario',
  standalone: true,
   imports: [CommonModule, ReactiveFormsModule,
      RouterModule,CardModule,ButtonModule,
      InputTextModule,ModelComponent],
  templateUrl: './registro-usuario.component.html',
  styleUrls: ['./registro-usuario.component.scss']
})
export class RegistroUsuarioComponent {
  @Output() regresarOUT = new EventEmitter<boolean>();

  registroForm: FormGroup;
  nuevoUsuario: boolean = false;

  constructor(private fb: FormBuilder, private _usuarioService: UsuarioService,
     private toastr: ToastrService
  ) {
    this.registroForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]], // Validación de email
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  /** Método de inicio de sesión (solo muestra en consola por ahora) */
  onLogin() {
    if (this.registroForm.valid) {
      console.log('Login exitoso:', this.registroForm.value);
    } else {
      console.warn('Formulario inválido');
    }
  }

  /** Método para registrar usuario */
  regristrarUsuario() {
    if (this.registroForm.valid) {
      const usuarioData = this.registroForm.value;
      console.log("Enviando usuario:", usuarioData); 
  
      this._usuarioService.registrarUsuario(usuarioData).subscribe({
        next: (response: any) => {
          this.toastr.success("Se creo el Usuario correctamente ");
          this.regresar()
          console.log("Usuario registrado con éxito:", response);
          
        },
        error: (err) => {
          this.toastr.error("Error al registrar usuario");
          console.error("Error al registrar usuario:", err);
        }
      });
    } else {
      this.toastr.info("El formulario esta incompleto");
      console.warn("El formulario no es válido");
    }
  }
  

  /** Método para regresar al componente anterior */
  regresar() {
    this.regresarOUT.emit(false);
  }
}