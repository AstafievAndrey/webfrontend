import { Injectable } from '@angular/core';
import { DEPARTMENTS } from '../../modules/departments/services/mock-departments';
import { EMPLOYEES } from '../../modules/employees/services/mock-employess';
import { from } from 'rxjs';

const DB_NAME = 'MyDb';
const DB_VERSION = 1;

@Injectable({
  providedIn: 'root'
})
export class IndexedDbService {
  request: IDBOpenDBRequest;
  db: IDBDatabase;
  initDb: boolean;

  constructor() {
    this.request = window.indexedDB.open(DB_NAME, DB_VERSION);
    this.init();
  }

  init() {
    this.request.onsuccess = (e: any) => {
      this.db = e.target.result;
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

  getObjectStore(store_name: string) {
    if (this.db) {
      return this.db.transaction(store_name).objectStore(store_name);
    }
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
