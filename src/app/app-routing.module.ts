import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const DEFAULT_REDIRECT = 'departments';

const routes: Routes = [
  {path: '', redirectTo: DEFAULT_REDIRECT, pathMatch: 'full'},
  {path: 'departments', loadChildren: './modules/departments/departments.module#DepartmentsModule'},
  {path: '**', redirectTo: DEFAULT_REDIRECT}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
