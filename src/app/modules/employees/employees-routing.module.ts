import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { EmployeeComponent } from './components/employee/employee.component';

const DEFAULT_REDIRECT = 'departments';

const routes: Routes = [
  {path: '', redirectTo: `/${DEFAULT_REDIRECT}`, pathMatch: 'full'},
  {path: ':id', component: EmployeeComponent},
  {path: '**', redirectTo: `/${DEFAULT_REDIRECT}`}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EmployeesRoutingModule { }
