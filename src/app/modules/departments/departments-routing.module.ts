import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DepartmentsListComponent } from './components/departments-list/departments-list.component';
import { DepartmentsDetailComponent } from './components/departments-detail/departments-detail.component';

const routes: Routes = [
  {path: '', component: DepartmentsListComponent},
  {path: ':id/employees', component: DepartmentsDetailComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DepartmentsRoutingModule { }
