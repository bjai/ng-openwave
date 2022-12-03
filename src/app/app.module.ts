import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { AgGridModule } from 'ag-grid-angular';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthGuard } from './auth/auth.guard';
import { AuthService } from './auth/auth.service';
import { LoginComponent } from './login/login.component';
import { TripComponent } from './trip/trip.component';
import { GridComponent } from './trip/grid/grid.component';
import { ActionRendererComponent } from './trip/grid/renderer/action-renderer/action-renderer.component';
import { SideNavComponent } from './side-nav/side-nav.component';
import { SideNavContentComponent } from './side-nav-content/side-nav-content.component';
import { NavigationService } from './services/navigation.service';
import { HeaderComponent } from './header/header.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    TripComponent,
    GridComponent,
    ActionRendererComponent,
    SideNavComponent,
    SideNavContentComponent,
    HeaderComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    HttpClientModule,
    AgGridModule
  ],
  providers: [AuthService, AuthGuard, NavigationService],
  bootstrap: [AppComponent]
})
export class AppModule { }
