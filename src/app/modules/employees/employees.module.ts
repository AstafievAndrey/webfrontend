import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EmployeesRoutingModule } from './employees-routing.module';
import { EmployeeComponent } from './components/employee/employee.component';
import { MaterialModule } from 'src/app/core/libs/material/material.module';

@NgModule({
  declarations: [EmployeeComponent],
  imports: [
    CommonModule,
    MaterialModule,
    EmployeesRoutingModule
  ]
})
export class EmployeesModule { }
