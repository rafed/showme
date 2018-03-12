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
import { SearchResultService } from './service/search-result.service';
import { HttpClientModule } from '@angular/common/http';
import { GenerateGraphService } from './service/generate-graph.service';
import { DisplayHistoryService } from './service/display-history.service';


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
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [SearchResultService, GenerateGraphService, DisplayHistoryService],
  bootstrap: [AppComponent]
})
export class AppModule { }
