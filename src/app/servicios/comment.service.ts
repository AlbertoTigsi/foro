import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Credentials } from '../modelo/credenciales';
import { Comments } from '../modelo/commnet';


@Injectable({
  providedIn: 'root',
})
export class CommentService {
  apiurl = 'https://go-back-end.onrender.com/comments';
  
  constructor(private http: HttpClient) {}


  registrarComment(comment: any) {
    return this.http.post<Comments>(`${this.apiurl}`, comment);
  }


}
