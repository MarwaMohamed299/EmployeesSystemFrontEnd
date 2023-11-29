import { Component } from '@angular/core';

@Component({
  selector: 'app-body',
  templateUrl: './body.component.html',
  styleUrls: ['./body.component.css']
})
export class BodyComponent {
name="";
employeeId ="";
Add(){
  let newEmployee = {name:this.name , employeeId =this.employeeId}

}

}
