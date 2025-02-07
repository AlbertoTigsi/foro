import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Credentials } from '../modelo/credenciales';
import { Activity } from '../modelo/acitivity';



@Injectable({
  providedIn: 'root',
})
export class ActivityService {
  apiurl = 'https://go-back-end.onrender.com/activity';
  
  constructor(private http: HttpClient) {}


  registrarActividad(activity: any) {
    return this.http.post<Activity>(`${this.apiurl}`, activity);
  }




}
