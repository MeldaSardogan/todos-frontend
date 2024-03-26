import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";
import {Task} from "./task";

@Injectable({
  providedIn: 'root'
})
export class TodoServiceService {
  baseUrl = 'http://localhost:3000/tasks';

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(private http: HttpClient) { }

  getAll(): Observable<Task[]>{
    return this.http.get<Task[]>(this.baseUrl);
  }

  deleteOne(id?: string): Observable<any>{
    return this.http.delete<any>(this.baseUrl + '/' + id, {observe: 'response'});
  }

  addOne(task: Task): Observable<Task> {
    return this.http.post<Task>(this.baseUrl, task, this.httpOptions);
  }

}
