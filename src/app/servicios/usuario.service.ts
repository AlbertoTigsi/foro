import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Credentials } from '../modelo/credenciales';
import { User } from '../modelo/user';


@Injectable({
  providedIn: 'root',
})
export class UsuarioService {
  apiurl = 'https://go-back-end.onrender.com/';
  apiurlogin = 'https://go-back-end.onrender.com/users/login';

  constructor(private http: HttpClient) {}


  registrarUsuario(user: any) {
    return this.http.post<User>(`${this.apiurl}users`, user);
  }



  login(credentials: Credentials): Observable<Credentials> {
    return this.http.post<Credentials>(`${this.apiurlogin}`, credentials);
  }

   listar() {
      return this.http.get<User[]>(`${this.apiurl}getAllUsers`);
    }


}
