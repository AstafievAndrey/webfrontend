import { NgModule } from '@angular/core';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatListModule} from '@angular/material/list';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {MatInputModule, MatCardModule, MatTableModule, MatPaginatorModule, MatSortModule, MatPaginatorIntl} from '@angular/material';
import {CdkTableModule} from '@angular/cdk/table';
import {LocalePaginatorIntl} from './localePaginatorIntl';

@NgModule({
  exports: [
    MatToolbarModule,
    MatIconModule,
    MatListModule,
    MatButtonModule,
    MatInputModule,
    MatCardModule,
    CdkTableModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule
  ],
  providers: [
    { provide: MatPaginatorIntl, useValue: LocalePaginatorIntl() }
  ]
})
export class MaterialModule { }
