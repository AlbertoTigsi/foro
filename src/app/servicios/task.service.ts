import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Task } from '../modelo/task';


@Injectable({
  providedIn: 'root',
})
export class TaskService {
  apiurl = 'https://go-back-end.onrender.com/';

  constructor(private http: HttpClient) {}


  registrarTask(task: any) {
    return this.http.post<Task>(`${this.apiurl}createTask`, task);
  }


  listar() {
    return this.http.get<Task[]>(`${this.apiurl}getAllTasks`);
  }

}
