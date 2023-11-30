import {HttpClient} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EmployeeServiceService {

  constructor(private readonly httpClient :HttpClient) {}

  private readonly  Base_URL ="https://localhost:7120/api/Employees"


  GetAll():Observable<EmployeeReadDto[]>{
    return this.httpClient.get<EmployeeReadDto[]>(this.Base_URL)
  }

  getEmployeeById(id: number): Observable<EmployeeReadDto> {
    return this.httpClient.get<EmployeeReadDto>(`${this.Base_URL}/${id}`);
  }
  

  add(newEmployee: EmployeeAddDto): Observable<EmployeeAddDto> {
    return this.httpClient.post<EmployeeAddDto>(this.Base_URL, newEmployee);
  }

  softDelete( DeletedEmployee:EmployeeUpdateDto,employeeId:number): Observable<string> {
    return this.httpClient.put<string>(`${this.Base_URL}/${employeeId}`, employeeId); 
  }



}


export interface EmployeeReadDto {
  employeeId: number;
  name: string;
  isActivated: boolean;
}
export interface EmployeeAddDto{

  isActivated: boolean;
  employeeId: number;
  name: string;

}
export interface EmployeeUpdateDto{

  employeeId: number;
  name: string;
  isActivated: boolean;
}
  