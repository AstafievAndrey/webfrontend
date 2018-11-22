import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Department } from './department';
import { DEPARTMENTS } from './mock-departments';

@Injectable({
  providedIn: 'root'
})
export class DepartmentsService {

  constructor() { }

  getDepartments(): Observable<Department[]> {
    return of(DEPARTMENTS);
  }
}
