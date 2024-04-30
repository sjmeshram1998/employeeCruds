import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Employee } from './employee.model';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {
private apiUrl='http://localhost:3000/employees';

  constructor(private http: HttpClient) { }

  listEmployee():Observable<Employee[]>{
    return this.http.get<Employee[]>(this.apiUrl)
    console.log(this.apiUrl)
  }
  addEmployee(empData: Employee):Observable<Employee[]>{
    return this.http.post<Employee[]>(this.apiUrl, empData)
  }

  deleteEmp( id: number):Observable<Employee[]>{
    return this.http.delete<Employee[]>(`${this.apiUrl}/${id}`)
  }

  updateEmployee(id: number, empData:Employee):Observable<Employee[]>{
    return this.http.put<Employee[]>(`${this.apiUrl}/${id}`,empData)
  }

}
