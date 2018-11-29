import { Injectable } from '@angular/core';
import { Observable, of, from  } from 'rxjs';
import { filter } from 'rxjs/operators';
import { Department } from './department';
import { DEPARTMENTS } from './mock-departments';
import { IndexedDbService } from 'src/app/core/services/indexed-db.service';

@Injectable({
  providedIn: 'root'
})
export class DepartmentsService {

  constructor(private indexedDbService: IndexedDbService) { }

  getIndexed() {
    const objectStore = this.indexedDbService.getObjectStore('departments');
  }

  getDepartment(id: number): Observable<Department> {
    const departments = from(DEPARTMENTS);
    return departments.pipe(filter(department => department.id === id));
  }

  getDepartments(): Observable<Department[]> {
    return of(DEPARTMENTS);
  }
}
