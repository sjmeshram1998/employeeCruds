import { Component, OnInit } from '@angular/core';
import { EmployeeService } from '../employee.service';
import { Employee } from '../employee.model';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
@Component({
  selector: 'app-list-employee',
  templateUrl: './list-employee.component.html',
  styleUrls: ['./list-employee.component.css']
})
export class ListEmployeeComponent implements OnInit {
   empData: Employee[] = [];
   public addEmployeeForm: FormGroup;
   showAdd!:boolean;
   showUpdate!: boolean;
   public empModelObj = new Employee;

  constructor(private empService: EmployeeService, private fb: FormBuilder){
  this.addEmployeeForm = this.fb.group({
    fname:['',Validators.required],
    email: ['',Validators.required],
    position: ['',Validators.required],
    dob: ['',Validators.required],
    gender: ['',Validators.required]
  })
}
ngOnInit(): void {
  this.listEmployee();
}
listEmployee(){
  this.empService.listEmployee().subscribe(data=>{
    this.empData=data
    console.log(this.empData)
  })
}
 add(){
  this.showAdd = true;
  this.showUpdate = false;
 }
 update(){
  this.showAdd = false;
  this.showUpdate = true;
 }
addEmployee(){
  if(this.addEmployeeForm.valid){
    this.empModelObj.name = this.addEmployeeForm.value.fname;
    this.empModelObj.email = this.addEmployeeForm.value.email;
    this.empModelObj.position = this.addEmployeeForm.value.position;
    this.empModelObj.dob = this.addEmployeeForm.value.dob;
    this.empModelObj.gender = this.addEmployeeForm.value.gender;
 
this.empService.addEmployee(this.empModelObj).subscribe((res)=>{
  console.log(res);
  alert("Record added succeessfully")
  this.addEmployeeForm.reset();
  this.listEmployee();
},error=>{
  console.log("something went wrong")
})
  }
else {
  alert("Please fill out all the fields");
  }
}


updateEmployee(emp: Employee): void {
  // Implement update functionality here
  // console.log(`Updating employee with ID: ${id}`);
  this.listEmployee();
}

deleteEmployee(id: number): void {
  // Implement delete functionality here
  if(confirm("Are you sure you want to delete this user?"))
  this.empService.deleteEmp(id).subscribe((res)=>{
alert("Record deleted sucessfully");
this.listEmployee();
},error=>{
  console.log("Something went wrong");
})
}
}
