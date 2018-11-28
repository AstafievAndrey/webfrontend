import { Injectable } from '@angular/core';
import { Observable, of, from } from 'rxjs';
import { Employees } from './employees';
import { EMPLOYEES } from './mock-employess';
// import { filter } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class EmployessService {

  constructor() { }

  getEmployessByDept(id: number): Observable<Employees[]> {
    return of(EMPLOYEES.filter(employee => employee.department_id === id));
  }
}
