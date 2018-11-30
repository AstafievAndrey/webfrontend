import { Injectable } from '@angular/core';
import { Observable, of, from } from 'rxjs';
import { Employees } from './employees';
import { EMPLOYEES } from './mock-employess';
import { filter } from 'rxjs/operators';
import { IndexedDbService } from 'src/app/core/services/indexed-db.service';

const NAME = 'employees';

@Injectable({
  providedIn: 'root'
})
export class EmployeesService {

  constructor(private indexedDbService: IndexedDbService) { }

  getEmployee(id: number): Observable<Employees> {
    return new Observable<Employees>(observer => {
      if (this.indexedDbService.initDb) {
        this.indexedDbService.get(id, this.indexedDbService.db, NAME, observer);
      } else {
        this.indexedDbService.dbSubject.subscribe(db => {
          this.indexedDbService.get(id, db, NAME, observer);
        });
      }
    });
  }

  getEmployessByDept(id: number): Observable<Employees[]> {
    const indexName = 'department_id';
    return new Observable<Employees[]>(observer => {
      if (this.indexedDbService.initDb) {
        this.indexedDbService.getIndexAll(id, this.indexedDbService.db, NAME, indexName, observer);
      } else {
        this.indexedDbService.dbSubject.subscribe(db => {
          this.indexedDbService.getIndexAll(id, db, NAME, indexName, observer);
        });
      }
    });
  }
}
