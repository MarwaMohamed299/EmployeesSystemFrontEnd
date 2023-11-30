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
////GetAllEmployees in the table
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

////Adding Employees 


isNameValid(): boolean {
  return this.name !== "";
}
Add() {
  if (this.isNameValid()) {
    let newEmployee : EmployeeAddDto = {
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


///Soft Deleting For Employees

delete(id: number) {
  this.employeeService.getEmployeeById(id).subscribe({
    next: (employee) => {
      const deletedEmployee: EmployeeUpdateDto = {
        employeeId: employee.employeeId,
        name: employee.name,
        isActivated: false
      };

      this.employeeService.edit(id, deletedEmployee).subscribe({
        next: () => {
          const index = this.employees.findIndex((e: any) => e.employeeId === id);
          if (index !== -1) {
            this.employees[index] = deletedEmployee;
          }
        },
        error: (error) => {
          console.log(error);
        }
      });
    },
    error: (error) => {
      console.log(error);
    }
  });
}
}