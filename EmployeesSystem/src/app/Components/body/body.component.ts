import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { EmployeeServiceService } from 'src/app/Services/employee-service.service';
import { EmployeeAddDto } from 'src/app/Services/employee-service.service';
import { EmployeeUpdateDto } from 'src/app/Services/employee-service.service';
@Component({
  selector: 'app-body',
  templateUrl: './body.component.html',
  styleUrls: ['./body.component.css']
})
export class BodyComponent {
  employees: any;
  name = "";
  isActivated = true;
  employeeId = 1;

  constructor(activatedRoute: ActivatedRoute, private employeeService: EmployeeServiceService) {
    employeeService.GetAll().subscribe({
      next: (data) => {
        this.employees = data;
      },
      error: (error) => {
        console.log(error);
      }
    });
  }

  isNameValid(): boolean {
    return this.name !== "";
  }

  Add() {
    if (this.isNameValid()) {
      let newEmployee: EmployeeAddDto = {
        name: this.name,
        isActivated: this.isActivated,
        employeeId: this.employeeId
      };

      this.employeeService.add(newEmployee).subscribe({
        next: (data) => {
          this.employees.push(data);
        },
        error: (error) => {
          console.log(error);
        }
      });

      this.employeeId++;
      this.name = "";
      this.isActivated = true;
    }
  }

  getEmployeeById(employeeId: number) {
    this.employeeService.getEmployeeById(employeeId).subscribe(
      (data) => {
        console.log(data);
      },
      (error) => {
        console.log(error);
      }
    );
  }

  delete(employeeId:number,name:string,isActivated:boolean)
  {
    let DeletedEmployee= {
      name: this.name,
      isActivated: false,
      employeeId: this.employeeId
    };
    this.employeeService.softDelete(DeletedEmployee,employeeId).subscribe({
    next:(data)=>{
        console.log(data)
    },
    error:(error)=>{
      console.log(error)
    }}
    );
  }

  



  }


