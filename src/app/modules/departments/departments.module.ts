import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DepartmentsRoutingModule } from './departments-routing.module';
import { DepartmentsListComponent } from './components/departments-list/departments-list.component';
import { MaterialModule } from 'src/app/core/libs/material/material.module';
import { Department } from './services/department';
import { Observable, of } from 'rxjs';
import { DepartmentsDetailComponent } from './components/departments-detail/departments-detail.component';

@NgModule({
  declarations: [DepartmentsListComponent, DepartmentsDetailComponent],
  imports: [
    CommonModule,
    MaterialModule,
    DepartmentsRoutingModule
  ]
})
export class DepartmentsModule {
  getDepartments(): Observable<Department[]> {
    return ;
  }
}
