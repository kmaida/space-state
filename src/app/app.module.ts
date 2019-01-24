import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { DatePipe } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './pages/home/home.component';
import { NeoComponent } from './shared/neo/neo.component';
import { LoadingComponent } from './shared/loading.component';
import { ErrorComponent } from './shared/error/error.component';
import { BiggerFasterComponent } from './pages/bigger-faster/bigger-faster.component';
import { NeoFormComponent } from './shared/neo/neo-form/neo-form.component';
import { MiniComponent } from './pages/mini/mini.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    NeoComponent,
    LoadingComponent,
    ErrorComponent,
    BiggerFasterComponent,
    NeoFormComponent,
    MiniComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [
    DatePipe
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
