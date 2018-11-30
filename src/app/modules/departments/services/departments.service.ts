import { Injectable } from '@angular/core';
import { Observable, of, from, Subscriber  } from 'rxjs';
import { filter } from 'rxjs/operators';
import { Department } from './department';
import { DEPARTMENTS } from './mock-departments';
import { IndexedDbService } from 'src/app/core/services/indexed-db.service';

const NAME = 'departments';

@Injectable({
  providedIn: 'root'
})
export class DepartmentsService {

  constructor(private indexedDbService: IndexedDbService) { }

  getDepartment(id: number): Observable<Department> {
    return new Observable<Department>(observer => {
      if (this.indexedDbService.initDb) {
        this.indexedDbService.get(id, this.indexedDbService.db, NAME, observer);
      } else {
        this.indexedDbService.dbSubject.subscribe(db => {
          this.indexedDbService.get(id, db, NAME, observer);
        });
      }
    });
  }

  getDepartments(): Observable<Department[]> {
    return new Observable<Department[]>(observer => {
      if (this.indexedDbService.initDb) {
        this.indexedDbService.getAll(this.indexedDbService.db, NAME, observer);
      } else {
        this.indexedDbService.dbSubject.subscribe(db => {
          this.indexedDbService.getAll(db, NAME, observer);
        });
      }
    });
  }
}
