import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HttpModule } from '@angular/http';
import { LoginComponent } from './component/login/login.component';
import { SignUpComponent } from './component/sign-up/sign-up.component';
import { SearchComponent } from './component/search/search.component';
import { SearchResultComponent } from './component/search-result/search-result.component';
import { GraphComponent } from './component/graph/graph.component';

const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'sign-up', component: SignUpComponent },
  { path: 'search', component: SearchComponent,
    children: [
      { path: 'result', component: SearchResultComponent },
      { path: 'graph', component: GraphComponent }
    ]
  }
];

@NgModule({
  imports: [ HttpModule, RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule { }
