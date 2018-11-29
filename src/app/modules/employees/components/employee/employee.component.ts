import { Component, OnInit } from '@angular/core';
import {FormControl, Validators, FormGroup} from '@angular/forms';
import { Employees } from '../../services/employees';
import { EmployeesService } from '../../services/employees.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.scss']
})
export class EmployeeComponent implements OnInit {
  employee: Employees;
  form: FormGroup = new FormGroup({
    surname: new FormControl('', [Validators.required]),
    name: new FormControl('', [Validators.required]),
    lastname: new FormControl('', [Validators.required]),
    phone: new FormControl('', [Validators.required]),
    birthday: new FormControl({value: '', disabled: true}),
  });

  constructor(private employeesService: EmployeesService,
      private route: ActivatedRoute
    ) { }

  ngOnInit() {
    this.getEmployee();
  }

  onSubmit() {
    console.log(this.employee, this.form);
  }

  getEmployee() {
    const id = +this.route.snapshot.paramMap.get('id');
    this.employeesService.getEmployee(id).subscribe(
      employee => {
        this.employee = employee;
        this.form.setValue({
          surname: this.employee.surname,
          name: this.employee.name,
          lastname: this.employee.lastname,
          phone: this.employee.phone,
          birthday: this.employee.birthday
        });
      }
    );
  }

}
