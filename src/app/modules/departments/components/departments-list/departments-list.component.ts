import { Component, OnInit } from '@angular/core';
import { DepartmentsService } from '../../services/departments.service';
import { Department } from '../../services/department';

@Component({
  selector: 'app-departments-list',
  templateUrl: './departments-list.component.html',
  styleUrls: ['./departments-list.component.scss']
})
export class DepartmentsListComponent implements OnInit {

   departments: Department[];

  constructor(private deparmentService: DepartmentsService) { }

  ngOnInit() {
    this.getDepartments();
  }

  getDepartments() {
    this.deparmentService.getDepartments()
      .subscribe(departments => this.departments = departments);
  }

}
