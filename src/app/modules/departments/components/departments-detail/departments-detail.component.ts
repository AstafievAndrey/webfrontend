import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Department } from '../../services/department';
import { DepartmentsService } from '../../services/departments.service';
import { of } from 'rxjs';
import { EmployessService } from 'src/app/modules/employees/services/employees.service';
import { Employees } from 'src/app/modules/employees/services/employees';
import { MatTableDataSource, MatPaginator, MatSort } from '@angular/material';

@Component({
  selector: 'app-departments-detail',
  templateUrl: './departments-detail.component.html',
  styleUrls: ['./departments-detail.component.scss']
})
export class DepartmentsDetailComponent implements OnInit {
  displayedColumns: string[] = ['id', 'surname', 'name', 'lastname', 'birthday', 'phone', 'view'];
  department: Department;
  dataSource: MatTableDataSource<Employees>;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor( private route: ActivatedRoute,
    private departmentsService: DepartmentsService,
    private employeesService: EmployessService
  ) { }

  ngOnInit() {
    this.getDepartment();
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  getDepartment(): void {
    const id = +this.route.snapshot.paramMap.get('id');
    this.departmentsService.getDepartment(id)
      .subscribe(department => {
        this.department = department;
        this.employeesService.getEmployessByDept(department.id)
          .subscribe(employees => {
            console.log(employees);
            this.dataSource = new MatTableDataSource(employees);
          });
      });
  }
}
