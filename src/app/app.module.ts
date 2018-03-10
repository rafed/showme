import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';


import { AppComponent } from './app.component';
import { LoginComponent } from './component/login/login.component';
import { AppRoutingModule } from './/app-routing.module';
import { SignUpComponent } from './component/sign-up/sign-up.component';
import { SearchComponent } from './component/search/search.component';
import { NavbarComponent } from './component/navbar/navbar.component';
import { SearchResultComponent } from './component/search-result/search-result.component';
import { GraphComponent } from './component/graph/graph.component';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    SignUpComponent,
    SearchComponent,
    NavbarComponent,
    SearchResultComponent,
    GraphComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
