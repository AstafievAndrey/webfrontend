import { Injectable } from '@angular/core';
import { DEPARTMENTS } from '../../modules/departments/services/mock-departments';
import { EMPLOYEES } from '../../modules/employees/services/mock-employess';
import { from, Subject, Observable } from 'rxjs';

const DB_NAME = 'MyDb';
const DB_VERSION = 1;

@Injectable({
  providedIn: 'root'
})
export class IndexedDbService {
  dbSubject = new Subject<IDBDatabase>();
  db: IDBDatabase = null;
  request: IDBOpenDBRequest;
  initDb: boolean;

  constructor() {
    this.request = window.indexedDB.open(DB_NAME, DB_VERSION);
    this.init();
  }

  init() {
    this.request.onsuccess = (e: any) => {
      this.db = e.target.result;
      this.dbSubject.next(this.db);
      this.initDb = true;
      console.log(`openDb ${DB_NAME} version ${DB_VERSION}`, this.db);
    };
    this.request.onerror =  (e: any) => {
      this.initDb = false;
      console.log(`erorr: ${e.target.errorCode}`);
    };
    this.request.onupgradeneeded = (e: any) => {
      this.onUpgrade(e);
    };
  }

  getDb(): any {
    if (this.db === null) {
      return this.dbSubject.asObservable();
    } else {
      return this.db;
    }
  }

  getAll(db: IDBDatabase, name: string, observer): void {
    const result = [];
    const objectStore = db.transaction(name).objectStore(name);
    objectStore.openCursor().onsuccess = () => {
      const cursor = event.target['result'];
      if (cursor) {
        result.push(cursor.value);
        cursor.continue();
      } else {
        observer.next(result);
        observer.unsubscribe();
      }
    };
  }

  get(id: number|string, db: IDBDatabase, name: string, observer): void {
    const objectStore = db.transaction(name).objectStore(name);
    const request = objectStore.get(id);
    request.onsuccess = () => {
      observer.next(request.result);
      observer.unsubscribe();
    };
  }

  getIndexAll(id: number|string, db: IDBDatabase, name: string, indexName: string, observer): void {
    const objectStore = db.transaction(name).objectStore(name);
    const index = objectStore.index(indexName);
    index.getAll(id).onsuccess = (event) => {
      observer.next(event.target['result']);
      observer.unsubscribe();
    };
  }

  onUpgrade(e: any): void {
    const thisDB = e.target.result;
    if (!thisDB.objectStoreNames.contains('departments')) {
      const store = thisDB.createObjectStore('departments', { keyPath: 'id', autoIncrement: true });
      store.createIndex('name', 'name', { unique: false });
      from(DEPARTMENTS).subscribe(department => store.add(department));
    }
    if (!thisDB.objectStoreNames.contains('employees')) {
      const store = thisDB.createObjectStore('employees', { keyPath: 'id', autoIncrement: true });
      store.createIndex('surname', 'surname', { unique: false });
      store.createIndex('name', 'name', { unique: false });
      store.createIndex('lastname', 'lastname', { unique: false });
      store.createIndex('birthday', 'birthday', { unique: false });
      store.createIndex('phone', 'phone', { unique: false });
      store.createIndex('department_id', 'department_id', { unique: false });
      store.createIndex('file_id', 'file_id', { unique: false });
      from(EMPLOYEES).subscribe(employee => store.add(employee));
    }
    if (!thisDB.objectStoreNames.contains('files')) {
      const store = thisDB.createObjectStore('files', { keyPath: 'id', autoIncrement: true });
      store.createIndex('name', 'name', { unique: false });
      store.createIndex('size', 'size', { unique: false });
      store.createIndex('type', 'type', { unique: false });
      store.createIndex('blob', 'blob', { unique: false });
    }
  }
}
