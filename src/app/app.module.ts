import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CardComponentComponent } from './graphic-components/card-component/card-component.component';
import { ListComponentComponent } from './graphic-components/list-component/list-component.component';
import { AdminComponentComponent } from './graphic-components/admin-component/admin-component.component';

@NgModule({
  declarations: [
    AppComponent,
    CardComponentComponent,
    ListComponentComponent,
    AdminComponentComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
