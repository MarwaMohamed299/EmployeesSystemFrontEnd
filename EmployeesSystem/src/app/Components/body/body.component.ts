import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { EmployeeServiceService } from 'src/app/Services/employee-service.service';
import { EmployeeAddDto } from 'src/app/Services/employee-service.service';
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


///Deleting Employees

delete(id: number) {
  // Soft delete by setting isActivated to false
  const deletedEmployee = this.employees.find((employee: { employeeId: number; }) => employee.employeeId === id);
  if (deletedEmployee) {
    deletedEmployee.isActivated = false;
    // Update the server
    this.employeeService.edit(id, deletedEmployee).subscribe({
      next: () => {
        // Handle successful deletion
        this.employees = this.employees.filter((employee: { employeeId: number; }) => employee.employeeId !== id);
      },
      error: (error) => {
        console.log(error);
      }
    });  
}
}

}
