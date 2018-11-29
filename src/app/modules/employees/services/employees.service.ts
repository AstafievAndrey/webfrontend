import { Injectable } from '@angular/core';
import { Observable, of, from } from 'rxjs';
import { Employees } from './employees';
import { EMPLOYEES } from './mock-employess';
import { filter } from 'rxjs/operators';
import { IndexedDbService } from 'src/app/core/services/indexed-db.service';

@Injectable({
  providedIn: 'root'
})
export class EmployeesService {

  constructor(private indexedDbService: IndexedDbService) { }

  getEmployee(id: number): Observable<Employees> {
    const employees = from(EMPLOYEES);
    return employees.pipe(filter(employee => employee.id === id));
  }

  getEmployessByDept(id: number): Observable<Employees[]> {
    return of(EMPLOYEES.filter(employee => employee.department_id === id));
  }
}
