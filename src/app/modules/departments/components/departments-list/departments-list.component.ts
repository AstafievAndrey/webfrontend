import { Component, OnInit, ViewChild } from '@angular/core';
import { DepartmentsService } from '../../services/departments.service';
import { Department } from '../../services/department';
import { MatTableDataSource, MatPaginator, MatSort } from '@angular/material';

@Component({
  selector: 'app-departments-list',
  templateUrl: './departments-list.component.html',
  styleUrls: ['./departments-list.component.scss']
})
export class DepartmentsListComponent implements OnInit {
   displayedColumns: string[] = ['id', 'name', 'view'];
   departments: Department[];
   dataSource: MatTableDataSource<Department>;

   @ViewChild(MatPaginator) paginator: MatPaginator;
   @ViewChild(MatSort) sort: MatSort;

  constructor(private deparmentService: DepartmentsService) { }

  ngOnInit() {
    this.getDepartments();
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  getDepartments() {
    this.deparmentService.getDepartments()
      .subscribe(
        departments => {
          this.dataSource = new MatTableDataSource(departments);
          this.dataSource.paginator = this.paginator;
          this.dataSource.sort = this.sort;
        }
      );
  }

}
