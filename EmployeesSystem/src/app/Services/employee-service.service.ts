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
    return this.httpClient.get<EmployeeReadDto>(this.Base_URL+id);
  }

  add(newEmployee: EmployeeAddDto): Observable<EmployeeReadDto> {
    return this.httpClient.post<EmployeeReadDto>(this.Base_URL, newEmployee);
  }

  edit(id: number, updateEmployee: EmployeeUpdateDto) {
    return this.httpClient.put<EmployeeReadDto>(this.Base_URL+id, updateEmployee);
  }

  deleteProduct(id: number) {
    return this.httpClient.delete(this.Base_URL+id);
  }

}


export interface EmployeeReadDto {
  employeeId: number;
  name: string;
  isActivated: boolean;
}
export interface EmployeeAddDto{

    
  
  name: string;
  isActivated: boolean;
}
export interface EmployeeUpdateDto{

  employeeId: number;
  name: string;
  isActivated: boolean;
}
  