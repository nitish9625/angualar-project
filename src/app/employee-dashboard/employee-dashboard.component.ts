import { EmployeModel } from './employee-dashnoard.model';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ApiService } from '../shared/api.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-employee-dashboard',
  templateUrl: './employee-dashboard.component.html',
  styleUrls: ['./employee-dashboard.component.css']
})
export class EmployeeDashboardComponent implements OnInit {
  formValue !: FormGroup;
  userdata: any;

  employeModelObj: EmployeModel = new EmployeModel();
  employeeData !:any;

  constructor(private formbuilder: FormBuilder, private api:ApiService, private router:Router) { }

  ngOnInit(): void {
    this.formValue = this.formbuilder.group({
      firstName:[''],
      lastName:[''],
      email:[''],
      mobile:[''],
      salary:['']
    })

    this.userdata =  localStorage.getItem('user')
    this.userdata = JSON.parse(this.userdata);
    console.log(this.userdata);
    
    this.getAllEmployee();
  }

  postEmployeeDetail(){
    this.employeModelObj.firstName = this.formValue.value.firstName;
    this.employeModelObj.lastName = this.formValue.value.lastName;  
    this.employeModelObj.email = this.formValue.value.email;
    this.employeModelObj.mobile = this.formValue.value.mobile;
    this.employeModelObj.salary = this.formValue.value.salary;

    this.api.postEmployee(this.employeModelObj)
    .subscribe(res=>{
      console.log(res)
      alert("Employee logged successfully !")
      let ref = document.getElementById('cancel');
      ref?.click();
        this.formValue.reset();
    },err=>{
      alert("Something went to wrong !")
    })
  }

getAllEmployee(){
  this.api.getEmployee()
  .subscribe(res=>{
    this.employeeData = res;
  })
}

deleteEmployee(row: any){
  this.api.deleteEmployee(row.id)
  .subscribe(res=>{
    alert("Employee Deleted !");
    this.getAllEmployee();
  })
}

onEdit(row: any){
  this.employeModelObj.id = row.id
  this.formValue.controls['firstName'].setValue(row.firstName);
  this.formValue.controls['lastName'].setValue(row.lastName);
  this.formValue.controls['email'].setValue(row.email);
  this.formValue.controls['mobile'].setValue(row.mobile);
  this.formValue.controls['salary'].setValue(row.salary);
}

updateEmployeeDetail(){
 
  this.employeModelObj.firstName = this.formValue.value.firstName;
    this.employeModelObj.lastName = this.formValue.value.lastName;  
    this.employeModelObj.email = this.formValue.value.email;
    this.employeModelObj.mobile = this.formValue.value.mobile;
    this.employeModelObj.salary = this.formValue.value.salary;
    this.api.updateEmployee(this.employeModelObj, this.employeModelObj.id)
    .subscribe(res=>{
      alert("updated successfuly !")
      let ref = document.getElementById('cancel');
      ref?.click();
        this.formValue.reset();
        this.getAllEmployee();

    },err=>{
      alert("Something went to wrong !");
    })
}

  logout(){
    localStorage.removeItem('user');
    console.log(localStorage.getItem('user'));
    this.router.navigate(['login']);
  }

}
