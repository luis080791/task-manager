import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

//Created components
import { CardComponentComponent } from './graphic-components/card-component/card-component.component';
import { ListComponentComponent } from './graphic-components/list-component/list-component.component';
import { AdminComponentComponent } from './graphic-components/admin-component/admin-component.component';
 
//Downloaded settings
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { CenterToCenterComponent } from './tag-components/center-to-center/center-to-center.component'

@NgModule({
  declarations: [
    AppComponent,
    CardComponentComponent,
    ListComponentComponent,
    AdminComponentComponent,
    CenterToCenterComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FontAwesomeModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
