import { CommonModule } from '@angular/common';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { ModelComponent } from '../shared/ui/model/model.component';
import { UsuarioService } from '../../servicios/usuario.service';
import { Task } from '../../modelo/task';
import { TaskService } from '../../servicios/task.service';
import { User } from '../../modelo/user';
import { TaskDTO } from '../../modelo/task-dto';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-tareas',
  standalone: true,
   imports: [CommonModule, ReactiveFormsModule,
        RouterModule,CardModule,ButtonModule,
        InputTextModule,ModelComponent],
  templateUrl: './tareas.component.html',
  styleUrls: ['./tareas.component.css']
})
export class TareasComponent implements OnInit {

 lstTask:Task[] = [];

 lstUser:User[] = [];

 matenimiento:boolean=false;
 registroForm: FormGroup;
 currentDate: Date = new Date();
 menuVisible: boolean = false;
 nombre: string = localStorage.getItem("user") as string;
 usuarioLogeado = new User();
 tareaGuarda = new TaskDTO();

  constructor(private fb: FormBuilder, private _taskService: TaskService, 
     private _usuarioService: UsuarioService,private _router :Router,
     private toastr: ToastrService) {

    this.registroForm = this.fb.group({
      Title: ['', Validators.required],
      Description: ['', Validators.required],
      Status: ['', Validators.required],
      Priority: ['', Validators.required],
      AssignedTo: ['', Validators.required]
    });
  }

  ngOnInit(): void {
   
    this.listarTareas();
    this.listarUsuarios()
  }


  toggleMenu() {
    this.menuVisible = !this.menuVisible;
  }


  listarTareas(){
  
    this._taskService.listar().subscribe({
      next: (response: Task[]) => {
        this.lstTask=response
       
      },
      error: (err) => {
        console.error("Error al registrar usuario:", err);
      }
    });
  }


  listarUsuarios(){
  
    this._usuarioService.listar().subscribe({
      next: (response: User[]) => {
        this.usuarioLogeado= response.filter(obj=> obj.Email === this.nombre)[0]

        this.lstUser=response
       
      },
      error: (err) => {
        console.error("Error al registrar usuario:", err);
      }
    });
  }

  closeModel() {
    this.matenimiento = false;
  }

  registrarTarea(){

    if (this.registroForm.valid) {

      this.tareaGuarda.title= this.registroForm.get('Title')?.value
      this.tareaGuarda.description= this.registroForm.get('Description')?.value
      this.tareaGuarda.priority= this.registroForm.get('Priority')?.value
      this.tareaGuarda.created_by= this.usuarioLogeado.ID
      this.tareaGuarda.status= this.registroForm.get('Status')?.value
      this.tareaGuarda.assigned_to= parseInt(this.registroForm.get('AssignedTo')?.value, 10);
      const fecha = new Date('2025-02-06T00:26:26.044007Z');
      this.tareaGuarda.due_date=fecha;

  
      this._taskService.registrarTask(this.tareaGuarda).subscribe({
        next: (response: any) => {
          this.toastr.success("Se creo tarea correctamente ");
          this.listarTareas()
          this.closeModel()
        
          console.log("Usuario registrado con éxito:", response);
        },
        error: (err) => {
          this.toastr.error("Error al registrar usuario")
          console.error("Error al registrar usuario:", err);
        }
      }); 
    } else {
      this.toastr.info("El formulario incompleto ");
      console.warn("El formulario no es válido");
    }

  }

  salir(){
    
    localStorage.removeItem("user");
    this._router.navigateByUrl('#');
  }
}
