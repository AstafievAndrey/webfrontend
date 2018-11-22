import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MaterialModule } from './core/libs/material/material.module';
import { ToolbarComponent } from './core/components/toolbar/toolbar.component';
import { ContainerComponent } from './core/components/container/container.component';

@NgModule({
  declarations: [
    AppComponent,
    ToolbarComponent,
    ContainerComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MaterialModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
